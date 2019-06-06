import React, { Component } from 'react'

export default class SnakeCell extends Component {
  render() {
    return (
      <div className={this.props.snake ? 'cell snake' : 'cell'}>

      </div>
    )
  }
}
