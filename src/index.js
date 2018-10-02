import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

function Square(props) {
  return (
    <button className="square"
    onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} />
      );
  }

  renderBoard() {
    let board = [];
    let index = 0;

    // loop to put each row on the board
    for(let i = 0; i < 3; i++) {
      let row = [];

      // loop to create each square in the row
      for(let j = 0; j < 3; j++) {
        // must wrap the renderSquare function call in div because babel tries to interpret the call as an object.
        // https://stackoverflow.com/questions/44849206/react-js-syntax-error-this-is-a-reserved-word-in-render-function
        row.push(<div key={index}>{this.renderSquare(index)}</div>);
        index++;
      }
      board.push(<div key={i} className="board-row">{row}</div>);
    }

    return board;
  }

  render() {
    return (
      <div className="board">
        {this.renderBoard()}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      numOfTurns: 0,
      winner: null
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.numOfTurns + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let numOfTurns, winner;
    numOfTurns = this.state.numOfTurns;
    winner = this.state.winner;
    numOfTurns += 1;

    if(winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    if(numOfTurns > 4) {
      winner = calculateWinner(squares);
    }

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      numOfTurns: history.length,
      winner: winner
    });
  }

  jumpTo(turn) {
    this.setState({
      numOfTurns: turn,
      xIsNext: (turn % 2) === 0,
      winner: (turn > 4) ? calculateWinner(this.state.history[turn]) : null
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.numOfTurns];
    const winner = this.state.winner;

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });

    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-title">Tic-Tac-Toe</div>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-movelist">
          <h3>Move List</h3>
          <ol>{moves}</ol>
        </div>
        <div className="game-status">{status}</div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
