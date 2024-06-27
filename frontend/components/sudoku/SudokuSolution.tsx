import React, { useState } from "react";

const defaultBoard = new Array(3)
  .fill("")
  .map(() =>
    new Array(3)
      .fill("")
      .map(() => new Array(3).fill("").map(() => new Array(3).fill("")))
  ); // Board is empty but should have some initial random values based on the game's rules

const boardIsFull = (board) => {
  return board.every((squaresRow) =>
    squaresRow.every((square) =>
      square.every((row) =>
        row.every((cell) => {
          console.log(cell);
          return cell !== "";
        })
      )
    )
  );
};

export const SudokuSolution = () => {
  const [board, setBoard] = useState(defaultBoard);

  const clearBoard = () => {
    setBoard(defaultBoard);
  };

  const handleChange = (
    newValue: number | null,
    path: [number, number, number, number]
  ) => {
    if (newValue !== null && newValue > 9) return;
    if (newValue !== null) {
      const square = board[path[0]][path[1]];
      if (square.some((row) => row.some((cell) => cell === newValue))) {
        return;
      }
      const fullRow = board[path[0]].flatMap((sq) => sq[path[2]]);
      if (fullRow.some((value) => value === newValue)) {
        return;
      }
      const fullColumn = board.flatMap((squareRow) =>
        squareRow[path[1]].flatMap((row) => row[path[3]])
      );
      if (fullColumn.some((value) => value === newValue)) {
        return;
      }
    }
    setBoard((oldValues) => {
      const newBoard = [...oldValues];
      newBoard[path[0]][path[1]][path[2]][path[3]] = newValue;
      return newBoard;
    });
  };

  if (boardIsFull(board)) {
    return (
      <div>
        <h2 style={{ color: "white" }}>
          Congratulations! You've solved the puzzle!
        </h2>
        <button style={{ margin: "1rem" }} onClick={clearBoard}>
          Play Again
        </button>
      </div>
    );
  }

  return (
    <main>
      <button style={{ margin: "1rem" }} onClick={clearBoard}>
        Clear Board
      </button>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          flexDirection: "column",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {board.map((squaresRow, squareRowIndex) => (
          <li style={{ display: "flex" }} key={`squareRow-${squareRowIndex}`}>
            {squaresRow.map((square, squareIndex) => (
              <ul
                style={{
                  flexDirection: "column",
                  border: "1px solid black",
                  width: "max-content",
                }}
                key={`square-${squareRowIndex}-${squareIndex}`}
              >
                {square.map((row, rowIndex) => (
                  <li key={`row-${squareRowIndex}-${squareIndex}-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <input
                        key={`cell-${squareRowIndex}-${squareIndex}-${rowIndex}-${cellIndex}`}
                        style={{
                          width: "30px",
                          height: "30px",
                          border: "1px solid white",
                          color: "white",
                          textAlign: "center",
                        }}
                        value={cell || ""}
                        type="number"
                        maxLength={1}
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-"].includes(evt.key) &&
                          evt.preventDefault()
                        }
                        onChange={(e) => {
                          e.preventDefault();
                          const value = Number(e.target.value);
                          const parsedValue =
                            e.target.value !== "0" && value === 0
                              ? null
                              : value;
                          handleChange(parsedValue, [
                            squareRowIndex,
                            squareIndex,
                            rowIndex,
                            cellIndex,
                          ]);
                        }}
                      />
                    ))}
                  </li>
                ))}
              </ul>
            ))}
          </li>
        ))}
      </ul>
    </main>
  );
};
