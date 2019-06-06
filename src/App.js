import React, { Component } from "react";
import { directions } from "./constants/constant";
import SnakeBoard from "./components/SnakeBoard";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: "RIGHT",
      score: 0,
      food: [9, 0],
      boardSize: 10,
      gameOver: false
    };
    this.bindEvents();
  }
  bindEvents() {
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.eatFoodHandler = this.eatFoodHandler.bind(this);
    this.handleCollisionHandler = this.handleCollisionHandler.bind(this);
  }
  generateFood() {
    let x = Math.floor(Math.random() * this.state.boardSize);
    let y = Math.floor(Math.random() * this.state.boardSize);
    return [x, y];
  }
  handleCollisionHandler() {
    window.navigator.vibrate(200);
    this.setState(prevState => {
      return {
        gameOver: true,
      };
    });
  }
  handleResetHandler() {
    this.setState(prevState => {
      return {
        reset: true,
        gameOver: false
      };
    });
  }
  eatFoodHandler() {
    this.setState(prevState => {
      return {
        score: prevState.score + 1,
        food: this.generateFood()
      };
    });
  }
  keyPressHandler(event) {
    let direction;
    switch (event.keyCode) {
      case directions.LEFT:
        if (this.state.direction !== "RIGHT") {
          direction = "LEFT";
        }
        break;
      case directions.UP:
        if (this.state.direction !== "DOWN") {
          direction = "UP";
        }
        break;
      case directions.RIGHT:
        if (this.state.direction !== "LEFT") {
          direction = "RIGHT";
        }
        break;
      case directions.DOWN:
        if (this.state.direction !== "UP") {
          direction = "DOWN";
        }
        break;
      default:
        break;
    }
    if (direction) {
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
    const { direction, boardSize, food, score } = this.state;
    return (
      <div className="game">
        <div className="game-board">
          <SnakeBoard
            direction={direction}
            size={boardSize}
            food={food}
            eatFood={this.eatFoodHandler}
            handleCollision={this.handleCollisionHandler}
          />
          <div className="game-info">
            {/* The game information will go inside here */}
            <div>Score : {score}</div>
            <div>
              <button
                hidden={!this.state.gameOver}
                onClick={this.handleResetHandler}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
