import { useEffect, useRef, useState } from "react";
import { Directions, Game } from "./entities/Game";
import { MAX_SCORE } from "./constants";

let game = new Game();

enum GameStatus {
  Playing,
  Lost,
  Won,
}

export const TetrisSolution = () => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const [_, rerender] = useState({});
  const [status, setStatus] = useState(GameStatus.Playing);
  const [speedUpFall, setSpeedUpFall] = useState(false);

  const playAgain = () => {
    setStatus(GameStatus.Playing);
    game = new Game();
  };

  useEffect(() => {
    const handleMove = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.code === "ArrowUp") {
        game.moveActiveBlock(Directions.Rotate);
      }
      if (e.code === "ArrowDown") {
        setSpeedUpFall(true);
      } else if (e.code === "ArrowLeft") {
        game.moveActiveBlock(Directions.Left);
      } else if (e.code === "ArrowRight") {
        game.moveActiveBlock(Directions.Right);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown") {
        setSpeedUpFall(false);
      }
    };
    document.addEventListener("keydown", handleMove);
    document.addEventListener("keyup", handleKeyUp);
    intervalRef.current = setInterval(
      () => {
        if (!game.activeBlock) {
          game.addNewBlock();
        } else {
          game.moveActiveBlock(Directions.Bottom);
        }

        if (game.lost) {
          setStatus(GameStatus.Lost);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }

        if (game.getScore() === MAX_SCORE) {
          setStatus(GameStatus.Won);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
        rerender({});
      },
      speedUpFall ? 50 : 500
    );

    return () => {
      document.removeEventListener("keydown", handleMove);
      document.removeEventListener("keyup", handleKeyUp);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [game, speedUpFall]);

  if (status !== GameStatus.Playing) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <h1 style={{ color: "white" }}>
          You {status === GameStatus.Lost ? "Lost" : "Won"}!
        </h1>
        <button onClick={playAgain}>Play again</button>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <p style={{ color: "white" }}>Score:</p>
        <h1 style={{ color: "white" }}>{game.getScore()}</h1>
      </div>
      <ul style={{ listStyle: "none" }}>
        {game.board.rows.map((row, rowI) => (
          <li key={`row-${rowI}`}>
            <ul style={{ display: "flex", listStyle: "none" }}>
              {row.map((cell, cellI) => (
                <li
                  key={`row-${rowI}-cell-${cellI}`}
                  style={{
                    height: 23,
                    width: 23,
                    border: "1px solid white",
                    ...(cell ? { backgroundColor: cell } : {}),
                  }}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};
