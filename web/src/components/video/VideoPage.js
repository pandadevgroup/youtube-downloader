import React from "react";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import { getDownloadedVideo } from "../../actions";
import VideoPlayer from "../video-player/VideoPlayer";

const styles = {
  
};
                      
class VideoPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      video: null
    };
  }

  componentDidMount() {
    const videoId = this.props.match.params.id;
    
    this.props.getVideo(videoId);
  }

  render() {
    const { classes, video } = this.props;

    return (
      <div>
        {
          video &&
          <VideoPlayer
            poster={window.URL.createObjectURL(video.thumbnailBlob)}
            src={window.URL.createObjectURL(video.videoBlob)} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.youtube.loading,
  error: state.youtube.error,
  video: state.youtube.downloadedVideo
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getVideo: id => dispatch(getDownloadedVideo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(VideoPage));
