import React, { Component } from "react";
import SnakeCell from "./SnakeCell";
export default class SnakeBoard extends Component {
  constructor(props) {
    super(props);
    this.gameInterval = null;
    this.reset = false;
    this.boardSize = this.props.size;
  }

  renderCell(cell, colIndex) {
    return <SnakeCell snake={cell} key={colIndex} />;
  }

  getFreshBoard() {
    return [...Array(this.boardSize)].map(() => Array(this.boardSize).fill(0));
  }

  render() {
    let board = [];
    board = this.getFreshBoard();
    const { snake, food } = this.props;
    snake.forEach(cell => {
      // console.log(cell[0], cell[1]);
      board[cell[0]][cell[1]] = 1;
    });
    board[snake[0][0]][snake[0][1]] = 2;
    board[food[0]][food[1]] = 3;

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
