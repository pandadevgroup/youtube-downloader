import React from 'react';
import HomePage from "./home/HomePage";
import VideoPage from "./video/VideoPage";
import { Route, Switch, Link } from "react-router-dom";
import injectSheet from 'react-jss'

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    flexDirection: "column"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  main: {
    flex: 1,
  },
};

class App extends React.Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.container}>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Youtube Downloader</Link>
          </nav>
        </header>

        <main className={classes.main}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/video/:id" component={VideoPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default injectSheet(styles)(App);
