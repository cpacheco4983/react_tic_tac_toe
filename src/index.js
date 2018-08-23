import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  //removed constructor because square no longer keeps trach of game state.
  //Now handled in Board

  render() {
    return (
      <button className="square"
      //use onClick and value passed by Board
      onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  //set Board to handle state of squares
  constructor(props) {
    super(props);
    //set all squares to null by default
    //state of squares is passed in renderSquare method
    this.state = {
      squares: Array(9).fill(null)
    };
  }
  //handle clicking of squares by passing this to Square through Board
  handleClick(i) {
    //create a copy of squares array so we dont alter original.
    //set clicked square value to X and set squares array value to new array
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return <Square
            //pass onClick to square so board can update state when square is clicked
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
