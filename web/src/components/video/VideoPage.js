import React from "react";
import injectSheet from "react-jss";
import * as YoutubeService from "../../services/youtube.service";
import * as Utils from "../../services/utils";
import YouTubePlayer from 'react-player/lib/players/YouTube';
import DownloadOptions from "../download-options/DownloadOptions";
import { getVideoInfo } from "../../actions";
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
  }

  componentDidMount() {
    if (this.props.match.params.id !== this.props.videoId) {
      this.props.getVideoInfo(this.props.match.params.id);
    }
  }
  
	componentDidUpdate(prevProps, prevState) {
    if (this.props.videoId !== prevProps.videoId && prevProps.videoId !== null) {
      prevProps.getVideoInfo(prevProps.match.params.id);
    }
  }

  getVideoInfo() {
    const videoId = this.state.videoId;
    YoutubeService.getVideoInfo(videoId)
      .then(videoInfo => this.setState({ videoInfo, error: null }))
      .catch(error => this.setState({ error }));
  }
  /* 
  this.collapseOpen = false;
  onCollapseClick() {
    if (this.collapseOpen) {
      //show collapse
    } else {
      //hide collapse
    }
    collapseOpen = !collapseOpen;
  }
  */
  render() {
    const { classes, videoInfo } = this.props;

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
          <DownloadOptions videoInfo={videoInfo} />
        </div>
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button onClick={/*run the commented out comment above*/} className="btn btn-link" data-toggle="collapse" data-target="#details" aria-expanded="true" aria-controls="collapse">
                Description
              </button>
            </h5>
          </div>

          <div id="details" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            <div className="card-body">
              {videoInfo.description.split('\n').map((item, key) => {
                return <span key={key}>{item}<br/></span>
              })}
            </div>
          </div>
        </div>
        
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

const mapStateToProps = (state, ownProps) => ({
	loading: state.youtube.loading,
	error: state.youtube.error,
  videoInfo: state.youtube.videoInfo,
  videoId: state.youtube.videoId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getVideoInfo: videoId => dispatch(getVideoInfo(videoId))
});

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(VideoPage));
