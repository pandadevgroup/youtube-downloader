import React from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import * as Utils from "../../services/utils";

const styles = {
  container: {
    width: "40rem",
    height: "6rem",
    marginTop: "1rem"
  },
  thumbnail: {
    height: "6rem",
    float: "left",
    marginRight: "1rem"
  },
  title: {
    fontSize: "1.5rem"
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    transition: "color 0.1s",
    "&:hover": {
      color: "#007bff",
      textDecoration: "none"
    }
  }
};

class VideoInfo extends React.Component {
  render() {
    const { classes, info } = this.props;

    return (
      <div className={classes.container}>
        <img src={info.thumbnailUrl || info.thumbnails.default.url} className={classes.thumbnail} alt={info.title} />
        <div className={classes.title}>
          <Link to={`/video/${info.video_id || info.id}`} className={classes.link}>
            {info.title}
          </Link>
        </div>
        {
          info.author &&
          <div className="mb-2">
            <a href={info.author.user_url} className={classes.link} target="_blank">
              {info.author.name}
            </a>
          </div>
        }
        {
          info.duration &&
          <div className="text-secondary">Duration: {Utils.secondsToText(info.length_seconds)}</div>
        }
      </div>
    );
  }
}

export default injectSheet(styles)(VideoInfo);
