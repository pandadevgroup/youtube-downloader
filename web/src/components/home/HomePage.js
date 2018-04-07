import React from "react";
import injectSheet from 'react-jss'
import * as YoutubeService from "../../services/youtube.service";
import Search from "../search/Search";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    paddingBottom: "64px"
  },
  title: {
    fontSize: "2rem",
    marginTop: "4rem",
    marginBottom: "1rem"
  }
};

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(search) {
    this.setState({ search });

		let videoURLRegex = new RegExp(
			"^(?:https?)?:\\/\\/(?:www\\.)?(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)(.+)$"
		);
    let videoIdResults = videoURLRegex.exec(search);
    let videoId;
    if (videoIdResults != null) videoId = videoIdResults[1];

    if (!videoId) return;

    YoutubeService.getVideoInfo(videoId)
      .then(info => console.log(info))
      .catch(err => console.error(err));
  }

  handleSubmit(search) {
    
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container} onSubmit={this.handleSubmit}>
        <h1 className={classes.title}>
          Youtube Downloader
        </h1>
        <Search handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default injectSheet(styles)(HomePage);
