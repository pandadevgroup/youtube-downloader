import React from 'react';
import HomePage from "./home/HomePage";
import { Route, Switch, Link } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from "material-ui/Button";
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import MenuIcon from 'material-ui-icons/Menu';
import HomeIcon from "material-ui-icons/Home";
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
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon/>
              </IconButton>
              <Typography variant="title" color="inherit">
                <Link to="/" className="link-reset">Youtube Downloader</Link>
              </Typography>
            </Toolbar>
          </AppBar>
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
