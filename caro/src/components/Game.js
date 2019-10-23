import React from "react";
//import { connect } from 'react-redux'
import Board from "./Board";

let Game = ({
  p_width,
  p_height,
  p_history,
  p_step,
  p_xIsNext,
  p_isDescending,
  p_changeStep,
  p_toggleXIsNext,
  p_clickSquare,
  p_sortMoves
}) => {
  let jumpTo = step => {
    p_changeStep(step);
  };
  let handleClick = (i, j) => {
    const history = p_history.slice(0, p_step + 1);
    const current = history[p_step];
    const squares = current.squares.slice();
    current.squares.map((row, idx) => {
      squares[idx] = current.squares[idx].slice();
      return true;
    });
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
    squares[i][j] = p_xIsNext ? "X" : "O";
    p_clickSquare(
      history.concat([
        {
          squares: squares,
          location: { x: i, y: j }
        }
      ])
    );
  };
  let sort = () => {
    p_sortMoves(!p_isDescending);
  };

  const history = p_history;
  const current = history[p_step];
  const winner = calculateWinner(current.squares);
  let moves = history.map((step, move) => {
    const backgroundBtn =
      move === p_step
        ? "btn-chosen"
        : "btn-play";
    const desc = move
      ? "Go to move #" +
        move +
        " (" +
        step.location.x +
        "," +
        step.location.y +
        ")"
      : "Go to game start";
    return p_step === move ? (
      <li key={move}>
        <button className="btn-chosen" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    ) : (
      <li key={move}>
        <button className="btn-play" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  if (!p_isDescending) {
    moves = moves.reverse();
  }

  let status;
  if (winner) {
    status = "Winner: " + winner.val;
  } else {
    status = "Next player: " + (p_xIsNext ? "X" : "O");
  }

  let arrow = p_isDescending ? "↓" : "↑";
  return (
    <div className="game">
      <div className="game-board">
        <div className="header">CARO GAME</div>
        <div className="nobr">
        <div className="status">{status}</div>
          <button
            type="button"
            className="re-play"
            onClick={() =>
              this.setState({
                history: [{ value: Array(2).fill(null) }],
                stepNumber: 0,
                reversed: false,
                i: -1,
                xIsNext: true,
                won: false
              })
            }
          >
            CHƠI LẠI
          </button>
        </div>
        <Board
          squares={current.squares}
          onClick={(i, j) => handleClick(i, j)}
          winner={winner}
        />
      </div>
      <div className="game-info">
        <div>
          <button className= "revese" onClick={sort}>Thứ tự bước {arrow}</button>
        </div>

        <ol>{moves}</ol>
      </div>
    </div>
  );
};

var nSquareToWin = 5;
function calculateWinner(squares) {
  let win;
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      //Kiểm trang NSquareToWin ô liên tiếp từ ô xuất phát sang phải, xuống góc phải dưới, xuống góc trái dưới
      //Nếu có NSquareToWin - 1 cặp liên tiếp giống nhau thì thắng
      //Direction: ToRight, ToRightDown, ToDown, ToLeftDown
      if (!squares[i][j]) continue;
      if (j <= squares[i].length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i][j + k] !== squares[i][j + k + 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: "ToRight" };
      }
      if (i <= squares.length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j] !== squares[i + k + 1][j]) {
            win = false;
          }
        }
        if (win) return { val: squares[i][j], x: j, y: i, direction: "ToDown" };
      }
      if (
        j <= squares[i].length - nSquareToWin &&
        i <= squares.length - nSquareToWin
      ) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: "ToRightDown" };
      }
      if (i <= squares.length - nSquareToWin && j >= nSquareToWin - 1) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: "ToLeftDown" };
      }
    }
  }
  return null;
}

export default Game;
