import React from "react";
import injectSheet from 'react-jss'
import Search from "../search/Search";
import { getVideoInfo, clearSearchResults, clearVideoInfo, searchVideos } from "../../actions";
import { connect } from "react-redux";
import VideoListItem from "../video-list-item/VideoListItem";

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
		
  }

  handleSubmit(search) {
    let videoId = this.getParameterByName("v", search);

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

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  componentWillUnmount() {
    this.props.clearSearchResults();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <h1 className={classes.title}>
          Youtube Downloader
        </h1>
        <Search onChange={this.handleChange} onSubmit={this.handleSubmit}/>
        {this.props.videoInfo && <VideoListItem info={this.props.videoInfo} />}
        {
          this.props.searchResults &&
          this.props.searchResults.map(result => 
            result.kind !== "youtube#channel"
              ? <VideoListItem info={result} key={result.id}/>
              : null
          )
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
