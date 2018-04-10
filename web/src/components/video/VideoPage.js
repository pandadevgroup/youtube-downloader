import React from "react";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import Dexie from "dexie";

const styles = {
  
};
                      
class VideoPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        Hello
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
	
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(VideoPage));
