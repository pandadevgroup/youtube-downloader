import React from "react";
import Plyr from 'plyr';

export default class VideoPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      playerId: "player-" + Math.floor(Math.random() * 1000),
      plyr: null
    };
  }

  componentDidMount() {
    this.setState({
      plyr: new Plyr(`#${this.state.playerId}`, {
        disableContextMenu: false,
        showPosterOnEnd: true,
        settings: ["speed", "loop"]
      })
    });
  }

  render() {
    return (
      <video
        poster={this.props.thumbnail}
        src={this.props.src}
        id={this.state.playerId}
        controls />
    );
  }
}
