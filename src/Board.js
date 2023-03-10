import React, { useState } from "react";
import Cell from "./Cell";
import _ from "lodash";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 6, ncols = 7, chanceLightStartsOn = 0.5 }) {
  // default params
  const [board, setBoard] = useState(createBoard); // never instantiate funct

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // // TODO: create array-of-arrays of true/false values
    return new Array(nrows).fill().map(() =>
      new Array(ncols).fill().map(() => {
        return Math.random() < chanceLightStartsOn;
      })
    );
  }

  /** check if all values in board matrix are true. */
  function hasWon() {
    // // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let deepBoardCopy = _.cloneDeep(oldBoard);

      // TODO: in the copy, flip this cell and the cells around it
      // deepBoardCopy.forEach((cell) => flipCell(y, x));
      // let rowAbove = y - 1;
      // let rowBelow = y + 1;
      // let colLeft = x - 1;
      // let colRight = x + 1;

      flipCell(y, x, deepBoardCopy); // flip cell clicked on
      flipCell(y - 1, x, deepBoardCopy); // flip cell above
      flipCell(y + 1, x, deepBoardCopy); // flilp cell below
      flipCell(y, x - 1, deepBoardCopy); // flip left cell
      flipCell(y, x + 1, deepBoardCopy); // flip right cell

      // TODO: return the copy
      return deepBoardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  // TODO
  if (hasWon()) {
    return <p>"you have won"</p>;
  }

  let htmlBoard = [];


  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`; // sim to cartesian corrdinates, x is still x, y is still y
      row.push(
          <Cell
              key={coord} //need key so react knows which cell you're talking about
              isLit={board[y][x]}
              flipCellsAroundMe={() => flipCellsAround(coord)}
          />,
      );
    }
    htmlBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
      <table className="Board">
        <tbody>{htmlBoard}</tbody>
      </table>
  );
}

export default Board;
