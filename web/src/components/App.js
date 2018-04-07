import React from 'react';
import HomePage from "./home/HomePage";
import { Route, Switch, Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
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
});

class App extends React.Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.container}>
        <header>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link class="navbar-brand" to="/">Youtube Downloader</Link>
          </nav>
        </header>

        <main className={classes.main}>
          <Switch>
            <Route path="/" exact component={HomePage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
