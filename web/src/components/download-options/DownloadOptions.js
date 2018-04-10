import React from "react";
import injectSheet from "react-jss";

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    "@media (min-width: 576px)": {
      justifyContent: "center",
      alignItems: "center"
    },
    "@media(max-width: 576px)": {
      flexDirection: "column",
      alignItems: "center"
    }
  }
};

class DownloadOptions extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      quality: "22" // HD
    };

    this.onDownloadClick = this.onDownloadClick.bind(this);
  }

  onDownloadClick() {
    this.props.onDownload(this.props.videoInfo, this.state.quality);
  }

  render() {
    const { classes, videoInfo, downloading } = this.props;

    return (
      <div className={classes.container}>
        {this.getDownloadOptions(videoInfo.formats)}
        <button onClick={this.onDownloadClick}
          className="btn btn-primary mx-3 my-2"
          disabled={downloading}>
          {downloading ? "Downloading..." : "Download"}
        </button>
        <div className="w-100"></div>
        <a href={`/api/download/${videoInfo.video_id}/${this.state.quality}`}
          target="_blank"
          download={videoInfo.title}>
          Direct download link
        </a>
      </div>
    );
  }

  getDownloadOptions(formats) {
    return Object.keys(formats).map(name => {
      const format = formats[name];
      return (
        <div className="custom-control custom-radio my-2 mx-3" key={format.itag}>
          <input type="radio"
            id={format.itag}
            name="customRadio"
            className="custom-control-input"
            checked={this.state.quality === format.itag}
            onChange={this.updateQuality(format.itag)} />
          <label className="custom-control-label" htmlFor={format.itag}>{name}</label>
        </div>
      );
    });
  }

  updateQuality = quality => event => {
    this.setState({ quality });
  }
}

export default injectSheet(styles)(DownloadOptions);
