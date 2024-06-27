import { useState } from "react";
import { useInterval } from "./useInterval";

export const IntervalImpl = () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);
  const toggleIsRunning = () => setIsRunning((val) => !val);

  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? delay : null
  );

  return (
    <>
      <div>
        delay:{" "}
        <input
          style={{
            width: "10rem",
            height: "2rem",
            borderRadius: 10,
            padding: 4,
            border: "1px solid grey",
          }}
          type="number"
          value={delay}
          onChange={(event) => setDelay(Number(event.target.value))}
        />
      </div>
      <h1>count: {count}</h1>
      <div>
        <button onClick={toggleIsRunning}>
          {isRunning ? "stop" : "start"}
        </button>
      </div>
    </>
  );
};
