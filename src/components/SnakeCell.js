import React, { Component } from "react";

export default class SnakeCell extends Component {
  render() {
    let className = "cell";
    const { snake } = this.props;
    switch (snake) {
      case 1:
        className = "cell snake";
        break;
      case 2:
        className = "cell head";
        break;
      case 3:
        className = "cell food";
        break;
      default:
        className = "cell";
        break;
    }

    return <div className={className} />;
  }
}
