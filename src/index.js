import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// replace Square class component with functional component.
// functional components cannot have 'this' keyword and only contain render method
function Square(props) {
  return (
    <button className="square"
    //use onClick and value passed by Board
    //remove arrow function and parens from onClick={() => props.onClick()}
    //arrow function was there for access to correct 'this' but no longer needed since its not a class component anymore
    //arrow function means it referenced its own 'this' now its using one passed from board?
    //still works if arrow func is left in there. maybe just good practice to remove it?
    onClick={props.onClick}>
      {props.value}
    </button>
  );
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
    //create a copy of squares array so we dont alter original. This allows us to see what changed
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
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
