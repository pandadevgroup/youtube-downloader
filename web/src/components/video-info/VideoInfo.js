import React from "react";
import injectSheet from "react-jss";

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
  }
};

class VideoInfo extends React.Component {
  render() {
    const { classes, info } = this.props;
    console.log(info);

    return (
      <div className={classes.container}>
        <img src={info.thumbnailUrl} className={classes.thumbnail} />
        <div className={classes.title}>{info.title}</div>
        <div className="mb-2">
          <a href={info.author.user_url} className="text-dark" target="_blank">
            {info.author.name}
          </a>
        </div>
        <div className="text-secondary">Duration: {this.secondsToText(info.length_seconds)}</div>
      </div>
    );
  }

  secondsToText(totalSeconds) {
    function numberEnding (number) {
      return (number > 1) ? 's' : '';
    }

    let seconds = totalSeconds % 60;
    let minutes = ~~(totalSeconds / 60);
    let hours = ~~(totalSeconds / 3600);

    seconds = seconds > 0 ? `${seconds} second${numberEnding(seconds)}` : "";
    minutes = minutes > 0 ? `${minutes} minute${numberEnding(minutes)}` : "";
    hours = hours > 0 ? `${hours} hour${numberEnding(hours)}` : "";

    return `${hours} ${minutes} ${seconds}`;
  }
}

export default injectSheet(styles)(VideoInfo);
