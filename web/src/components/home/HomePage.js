import React from "react";
import injectSheet from 'react-jss'
import * as YoutubeService from "../../services/youtube.service";
import {DebounceInput} from 'react-debounce-input';

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
  },
  searchForm: {
    width: "100%",
    maxWidth: "40rem"
  },
  submit: {
    border: "1px solid #ced4da"
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

  handleChange(event) {
    let search = event.target.value;
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

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container} onSubmit={this.handleSubmit}>
        <h1 className={classes.title}>
          Youtube Downloader
        </h1>
        <form noValidate autoComplete="off" className={classes.searchForm}>
          <div className="input-group">
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              type="text"
              className="form-control"
              value={this.state.search}
              onChange={this.handleChange}
              placeholder="Search or paste link here" />
            <div className="input-group-append">
              <button className={`btn btn-outline-primary ${classes.submit}`} type="submit">Go</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default injectSheet(styles)(HomePage);
