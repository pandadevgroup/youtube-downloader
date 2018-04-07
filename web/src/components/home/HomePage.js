import React from "react";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  contianer: {
    display: "flex",
  },
});

class HomePage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        
        Home
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
