import React from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    paddingBottom: "64px"
  },
  title: {
    fontSize: "2rem",
    marginTop: "4rem"
  },
  searchForm: {
    width: "100%",
    maxWidth: "40rem",
    display: "flex"
  },
  search: {
    flex: 1
  },
  buttonContainer: {
    margin: "auto",
    marginLeft: "1rem"
  }
});

class HomePage extends React.Component {  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography variant="headline" gutterBottom className={classes.title}>
          Youtube Downloader
        </Typography>
        <form noValidate autoComplete="off" className={classes.searchForm}>
          <TextField
            id="name"
            placeholder="Search or paste link here"
            className={classes.search}
            margin="normal" />
          <div className={classes.buttonContainer}>
            <Button
              variant="raised"
              color="primary"
              onClick={this.handleButtonClick}
              style={{ minWidth: "60px" }}
              type="submit">
              Go
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
