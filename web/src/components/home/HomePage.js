import React from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

const styles = theme => ({
  container: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "64px"
  },
  title: {
    fontSize: "2rem"
  },
});

class HomePage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography variant="headline" gutterBottom className={classes.title}>
          Youtube Downloader
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
