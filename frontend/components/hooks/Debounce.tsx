import { useState } from "react";
import { useDebounce } from "./useDebounce";

export const DebounceImpl = () => {
  const [state, setState] = useState("Typing stopped");
  const [val, setVal] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const [_, cancel] = useDebounce(
    () => {
      setState("Typing stopped");
      setDebouncedValue(val);
    },
    2000,
    [val]
  );

  const cancelDebounce = () => {
    cancel();
    setState("Debounce cancelled");
  };

  return (
    <>
      <input
        type="text"
        value={val}
        placeholder="Debounced input"
        onChange={({ currentTarget }) => {
          setState("Waiting for typing to stop...");
          setVal(currentTarget.value);
        }}
        style={{
          width: "20rem",
          height: "2rem",
          borderRadius: 10,
          padding: 4,
          border: "1px solid grey",
        }}
      />
      <div>{state}</div>
      <div>Debounced value: {debouncedValue}</div>
      <button onClick={cancelDebounce} style={{ width: "max-content" }}>
        Cancel debounce
      </button>
    </>
  );
};
