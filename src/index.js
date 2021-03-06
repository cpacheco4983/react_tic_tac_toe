import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

  render() {
    return (
      <div>
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
    //instead of getting full history we get it to the number of turns taken so if we go back, future moves will be discarded
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

    //set numOfTurns to lenght of history array in case of jump back we have right number
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      numOfTurns: history.length,
      winner: winner
    });
  }

  //set related state properties to correct values
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

    //create list of moves taken in game. step is board state, move is index?
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

    //add list of moves to Game component
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
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
