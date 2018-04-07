import React from "react";
import injectSheet from "react-jss";

const styles = {

};

class VideoInfo extends React.Component {
  render() {
    const { classes, info } = this.props;
    
    return (
      <div>
        <pre>{JSON.stringify(info, null, 4)}</pre>
      </div>
    );
  }
}

export default injectSheet(styles)(VideoInfo);
