import React from "react";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import * as storageService from "../../services/storage.service";
import { getDownloadedVideo } from "../../actions";

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
    
    storageService.getVideo(videoId).then(video => this.setState({ video }));
  }

  render() {
    const { classes } = this.props;
    const { video } = this.state;

    return (
      <div>
        {
          video &&
          <video src={window.URL.createObjectURL(video.blob)} controls />
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
