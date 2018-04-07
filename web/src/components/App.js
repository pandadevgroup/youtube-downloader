import React from 'react';
import HomePage from "./home/HomePage";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <main>
          <Switch>
            <Route path="/" exact component={HomePage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
