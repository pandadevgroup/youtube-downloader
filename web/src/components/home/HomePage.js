import React from "react";
import injectSheet from 'react-jss'

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
    maxWidth: "40rem",
    display: "flex"
  },
  search: {
    flex: 1
  }
};

class HomePage extends React.Component {  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <h1 className={classes.title}>
          Youtube Downloader
        </h1>
        <form noValidate autoComplete="off" className={classes.searchForm}>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search or paste link here" />
          </div>
          <button class="btn btn-primary" type="submit">
            Go
          </button>
        </form>
      </div>
    );
  }
}

export default injectSheet(styles)(HomePage);
