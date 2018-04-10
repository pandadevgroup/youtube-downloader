import React from "react";
import injectSheet from 'react-jss'
import Search from "../search/Search";
import VideoInfo from "../video-info/VideoInfo";
import { getVideoInfo, clearSearchResults, clearVideoInfo, searchVideos } from "../../actions";
import { connect } from "react-redux";

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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(search) {
		let videoURLRegex = new RegExp(
			"^(?:https?)?\\:\\/\\/(?:www\\.)?(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)(.+?)(?:\\v=.*)?$"
    );
    //last capture group to get rid of query strings
    let videoIdResults = videoURLRegex.exec(search);
    let videoId;
    if (videoIdResults != null) videoId = videoIdResults[1];

    if (!videoId) {
      // User searched something
      this.props.clearVideoInfo();
      this.props.searchVideos(search);
    } else {
      // User entered a URL
      this.props.clearSearchResults();
      this.props.getVideoInfo(videoId);
    }
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
        <Search onChange={this.handleChange} onSubmit={this.handleSubmit}/>
        {this.props.videoInfo && <VideoInfo info={this.props.videoInfo} />}
        {
          this.props.searchResults &&
          <pre style={{ maxWidth: "100%" }}>
            {JSON.stringify(this.props.searchResults, null, 4)}
          </pre>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
	loading: state.youtube.loading,
	error: state.youtube.error,
  videoInfo: state.youtube.videoInfo,
  searchResults: state.youtube.searchResults
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getVideoInfo: videoId => dispatch(getVideoInfo(videoId)),
  searchVideos: query => dispatch(searchVideos(query)),
  clearVideoInfo: _ => dispatch(clearVideoInfo()),
  clearSearchResults: _ => dispatch(clearSearchResults())
});

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(HomePage));
