import React from "react";
import injectSheet from "react-jss";

const styles = {
  container: {
    width: "100%",
    display: "flex",
    "@media (min-width: 576px)": {
      maxWidth: "30rem",
      margin: "0 auto",
      justifyContent: "space-around",
      alignItems: "center"
    },
    "@media(max-width: 576px)": {
      flexDirection: "column",
      alignItems: "center"
    }
  }
};

class DownloadOptions extends React.Component {
  render() {
    const { classes, videoId, title } = this.props;

    return (
      <div className={classes.container}>
        <div class="custom-control custom-radio my-2">
          <input type="radio" id="hd720" name="customRadio" class="custom-control-input" checked />
          <label class="custom-control-label" for="hd720">HD 720p (mp4)</label>
        </div>
        <div class="custom-control custom-radio my-2">
          <input type="radio" id="sd360" name="customRadio" class="custom-control-input" />
          <label class="custom-control-label" for="sd360">SD 360p (mp4)</label>
        </div>
        <a href={`/api/download/${videoId}`}
          target="_blank"
          download={title}
          class="btn btn-primary">
          Download
        </a>
      </div>
    );
  }
}

export default injectSheet(styles)(DownloadOptions);
