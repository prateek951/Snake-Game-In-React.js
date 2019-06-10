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
      snake: [[0, 3], [0, 2], [0, 1], [0, 0]],
      boardSize: 10,
      gameOver: false
    };
    this.rear = null;
    this.interval = null;
    this.bindEvents();
  }

  bindEvents() {
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.eatFoodHandler = this.eatFoodHandler.bind(this);
    this.handleCollisionHandler = this.handleCollisionHandler.bind(this);
    this.handleResetHandler = this.handleResetHandler.bind(this);
    this.initGameHandler = this.initGameHandler.bind(this);
    this.initGameHandler();
  }

  initGameHandler() {
    this.setState({
      direction: "RIGHT",
      snake: [[0, 3], [0, 2], [0, 1], [0, 0]],
      food: this.generateFood(),
      gameOver: false,
      score: 0
    });
    this.interval = setInterval(() => {
      this.takeStepHandler();
    }, 200);
  }

  hasCollisionOccured = (cell, i) => {
    return (
      i !== 0 &&
      this.state.snake[0][0] === cell[0] &&
      this.state.snake[0][1] === cell[1]
    );
  };

  componentDidUpdate(prevProps, prevState) {
    let collisionOccured = this.state.snake.find(this.hasCollisionOccured);
    if (collisionOccured && !this.state.gameOver) {
      this.handleCollisionHandler();
    }
    if (
      this.state.snake[0][0] === this.state.food[0] &&
      this.state.snake[0][1] === this.state.food[1]
    ) {
      this.eatFoodHandler();
    }
  }

  takeStepHandler = () => {
    this.setState(prevState => {
      let newPosition;
      switch (this.state.direction) {
        case "UP":
          newPosition = this.moveUpHandler(prevState.snake[0]);
          break;
        case "DOWN":
          newPosition = this.moveDownHandler(prevState.snake[0]);
          break;
        case "LEFT":
          newPosition = this.moveLeftHandler(prevState.snake[0]);
          break;
        case "RIGHT":
          newPosition = this.moveRightHandler(prevState.snake[0]);
          break;
        default:
          break;
      }
      let cloneSnake = [...prevState.snake];
      cloneSnake.unshift(newPosition);
      this.rear = cloneSnake.pop();
      return {
        snake: cloneSnake
      };
    });
  };
  // Method to move up
  moveUpHandler = ([x, y]) => [this.decrement(x), y];
  // Method to move down
  moveDownHandler = ([x, y]) => [this.increment(x), y];
  // Method to move left
  moveLeftHandler = ([x, y]) => [x, this.decrement(y)];
  // Method to move right
  moveRightHandler = ([x, y]) => [x, this.increment(y)];

  // Increment the coordinate of the board
  // Decrement the coordinate of the board
  increment = i => (i + 1) % this.state.boardSize;
  decrement = i => (i - 1 + this.state.boardSize) % this.state.boardSize;
  generateFood() {
    let x = Math.floor(Math.random() * this.state.boardSize);
    let y = Math.floor(Math.random() * this.state.boardSize);
    return [x, y];
  }
  handleCollisionHandler() {
    clearInterval(this.interval);
    this.setState({ gameOver: true });
  }
  componentDidMount() {
    document.addEventListener(
      "keydown",
      this.keyPressHandler.bind(this),
      false
    );
  }
  handleResetHandler() {
    this.initGameHandler();
  }
  eatFoodHandler() {
    this.setState(prevState => {
      let cloneSnake = [...prevState.snake];
      cloneSnake.push(this.rear);
      return {
        score: prevState.score + 1,
        food: this.generateFood(),
        snake: cloneSnake
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

  render() {
    const { direction, boardSize, food, score, snake } = this.state;
    return (
      <div className="game">
        <div className="game-board">
          {!this.state.gameOver || this.state.reset ? (
            <SnakeBoard
              direction={direction}
              size={boardSize}
              food={food}
              snake={snake}
              eatFood={this.eatFoodHandler}
              gameOver={this.state.gameOver}
              handleCollision={this.handleCollisionHandler}
            />
          ) : (
              <h1 className="game-over">Game Over. Lets play another one.</h1>
          )}
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
