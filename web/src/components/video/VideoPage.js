import React from "react";
import injectSheet from "react-jss";
import * as YoutubeService from "../../services/youtube.service";
import * as Utils from "../../services/utils";
import YouTubePlayer from 'react-player/lib/players/YouTube'
import DownloadOptions from "../download-options/DownloadOptions"

const styles = {
  container: {
    maxWidth: "60rem",
    margin: "2rem auto"
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    transition: "color 0.1s",
    "&:hover": {
      color: "#007bff",
      textDecoration: "none"
    }
  },
  description: {
    whiteSpace: "pre-line",
    maxHeight: "100px",
    overflowY: "auto"
  },
  playerWrapper: {
    position: "relative",
    paddingTop: "56.25%"
  },
  player: {
    position: "absolute",
    top: 0,
    left: 0
  }
};

class VideoPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      videoId: props.match.params.id,
      videoInfo: null,
      error: null
    };

    this.getVideoInfo();
  }

	static getDerivedStateFromProps(nextProps, prevState) {
		const videoId = nextProps.match.params.id;
		if (videoId && videoId !== prevState.videoId) {
      // Video ID changed
      return {
        videoId,
        videoInfo: null
      };
		}

		return null;
  }

	componentDidUpdate(prevProps, prevState) {
    if (prevState.videoInfo === null) {
      this.getVideoInfo();
    }
  }

  getVideoInfo() {
    const videoId = this.state.videoId;
    YoutubeService.getVideoInfo(videoId)
      .then(videoInfo => this.setState({ videoInfo, error: null }))
      .catch(error => this.setState({ error }));
  }
  
  render() {
    const { classes } = this.props;
    const { videoInfo } = this.state;

    return videoInfo && (
      <div className={classes.container}>
        <h1 className={`${classes.title} text-center`}>
          {videoInfo.title}
        </h1>
        <p className="mb-1">
          <a href={videoInfo.author.user_url} className={classes.link} target="_blank">
            {videoInfo.author.name}
          </a>
        </p>
        <p className="text-secondary mb-3">Duration: {Utils.secondsToText(videoInfo.length_seconds)}</p>

        <div className="mb-3">
          <DownloadOptions videoId={videoInfo.video_id} title={videoInfo.title} />
        </div>

        <p className={`mb-1 ${classes.description}`}>{videoInfo.description}</p>
        <div className={classes.playerWrapper}>
          <YouTubePlayer
            url={videoInfo.video_url}
            controls
            youtubeConfig={{ playerVars: { showinfo: 1 } }}
            width='100%'
            height='100%'
            className={classes.player} />
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(VideoPage);
