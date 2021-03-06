import React from "react";
import injectSheet from "react-jss";
import YouTubePlayer from "react-player/lib/players/YouTube";
import * as Utils from "../../services/utils";
import DownloadOptions from "../download-options/DownloadOptions";
import { getVideoInfo, clearVideoInfo, downloadVideo } from "../../actions";
import { connect } from "react-redux";

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
    whiteSpace: "pre-line"
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
                      
class DownloadPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showDescription: false
    };

    this.toggleDescription = this.toggleDescription.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id !== this.props.videoId) {
      this.props.getVideoInfo(this.props.match.params.id);
    }
  }
  
	componentDidUpdate(prevProps, prevState) {
    if (this.props.videoId !== prevProps.videoId && !this.props.loading) {
      prevProps.getVideoInfo(prevProps.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.clearVideoInfo();
  }

  toggleDescription() {
    this.setState(state => ({ showDescription: !state.showDescription }));
  }

  handleDownload(videoInfo, quality) {
    const videoId = videoInfo.video_id;

    this.props.downloadVideo(videoId, quality, videoInfo);
  }

  render() {
    const { classes, videoInfo, downloading, error } = this.props;

    return videoInfo && (
      <div className={classes.container}>
        <h1 className={`${classes.title} text-center mb-3`}>
          {videoInfo.title}
        </h1>
        {
          error &&
          <div className="alert alert-danger" role="alert">
            Error: {error}
          </div>
        }
        <p className="mb-1">
          <a href={videoInfo.author.user_url} className={classes.link} target="_blank">
            {videoInfo.author.name}
          </a>
        </p>
        <p className="text-secondary mb-3">Duration: {Utils.secondsToText(videoInfo.length_seconds)}</p>

        <div className="mb-3">
          <DownloadOptions videoInfo={videoInfo} onDownload={this.handleDownload} downloading={downloading} />
        </div>
        <div className="card mb-3">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button className="btn btn-link" onClick={this.toggleDescription}>
                Description
              </button>
            </h5>
          </div>

          <div className={`collapse ${this.state.showDescription ? "show" : ""}`}>
            <div className={`${classes.description} card-body`}>
              {videoInfo.description}
            </div>
          </div>
        </div>
        
        <div className={classes.playerWrapper}>
          <YouTubePlayer
            url={videoInfo.video_url}
            controls
            youtubeConfig={{ playerVars: { showinfo: 1, modestbranding: 0 } }}
            width='100%'
            height='100%'
            className={classes.player} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
	loading: state.youtube.loading,
	downloading: state.youtube.downloading,
	error: state.youtube.error,
  videoInfo: state.youtube.videoInfo,
  videoId: state.youtube.videoId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getVideoInfo: videoId => dispatch(getVideoInfo(videoId)),
  clearVideoInfo: _ => dispatch(clearVideoInfo()),
  downloadVideo: (videoId, quality, videoInfo) => dispatch(downloadVideo(videoId, quality, videoInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(DownloadPage));
