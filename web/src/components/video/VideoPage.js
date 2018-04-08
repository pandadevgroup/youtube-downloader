import React from "react";
import injectSheet from "react-jss";
import * as YoutubeService from "../../services/youtube.service";
import * as Utils from "../../services/utils";

const styles = {

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
      <div>
        <img src={videoInfo.fullResThumbnailUrl} className={classes.thumbnail} alt={videoInfo.title} />
        <div className={classes.title}>
          {videoInfo.title}
        </div>
        <div className="mb-2">
          <a href={videoInfo.author.user_url} className={classes.link} target="_blank">
            {videoInfo.author.name}
          </a>
        </div>
        <div className="text-secondary">Duration: {Utils.secondsToText(videoInfo.length_seconds)}</div>
      </div>
    );
  }
}

export default injectSheet(styles)(VideoPage);
