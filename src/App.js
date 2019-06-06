import React, { Component } from "react";
import { directions } from "./constants/constant";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: "RIGHT"
    };
    this.bindEvents();
  }
  bindEvents() {
    this.keyPressHandler = this.keyPressHandler.bind(this);
  }
  keyPressHandler(event) {
    let direction;
    switch (event.keyCode) {
      case directions.LEFT:
        direction = "LEFT";
        break;
      case directions.UP:
        direction = "UP";
        break;
      case directions.RIGHT:
        direction = "RIGHT";
        break;
      case directions.DOWN:
        direction = "DOWN";
        break;
      default:
        break;
    }
    if (dir) {
      // console.log(dir);
      this.setState({ direction });
    }
  }

  componentDidMount() {
    document.addEventListener(
      "keydown",
      this.keyPressHandler.bind(this),
      false
    );
  }

  render() {
    const { direction } = this.state;
    return ( 
      <div className="game">
        <div className="game-board">
          <SnakeBoard direction={direction}/>
          <div className="game-info">
              {/* The game information will go inside here */}
          </div>
        </div>
      </div>
    )
  }
}
