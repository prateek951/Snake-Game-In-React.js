import React, { Component } from "react";
import SnakeCell from "./SnakeCell";
export default class SnakeBoard extends Component {
  constructor(props) {
    super(props);
    this.gameInterval = null;
    this.reset = false;
    this.state = {
      // head of the snake
      snake: [[0, 3], [0, 2], [0, 1], [0, 0]]
    };
    this.boardSize = this.props.size;
  }
  componentDidMount() {
    this.gameInterval = setInterval(() => {
      if (!this.props.gameOver) {
        this.takeStepHandler();
      }
    }, 100);
  }
  takeStepHandler = () => {
    this.setState(prevState => {
      let newPosition;
      switch (this.props.direction) {
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

      if (
        cloneSnake.find(c => newPosition[0] === c[0] && newPosition[1] === c[1])
      ) {
        this.props.handleCollision();
      }
      cloneSnake.unshift(newPosition);
      if (
        newPosition[0] === this.props.food[0] &&
        newPosition[1] === this.props.food[1]
      ) {
        this.props.eatFood();
      } else {
        cloneSnake.pop();
      }

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
  increment = i => (i + 1) % this.boardSize;
  decrement = i => (i - 1 + this.boardSize) % this.boardSize;

  renderCell(cell, colIndex) {
    return <SnakeCell snake={cell} key={colIndex} />;
  }

  getFreshBoard() {
    return [...Array(this.boardSize)].map(() => Array(this.boardSize).fill(0));
  }

  render() {
    let board = [];
    board = this.getFreshBoard();
    const { snake } = this.state;

    const { food } = this.props;
    snake.forEach(cell => {
      board[cell[0]][cell[1]] = 1;
    });

    board[food[0]][food[1]] = 1;

    return (
      <div className="game-board">
        {board.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((cell, colIndex) => this.renderCell(cell, colIndex))}
          </div>
        ))}
      </div>
    );
  }
}
