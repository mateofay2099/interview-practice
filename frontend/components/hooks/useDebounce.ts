import { useEffect, useRef, useState } from "react";

export const useDebounce = (fn: () => void, ms: number, deps: any[] = []) => {
  const [timeoutState, setTimeoutState] = useState<boolean | null>(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const cancelTimeout = () => {
    setTimeoutState(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    setTimeoutState(false);
    timeoutRef.current = setTimeout(() => {
      fn();
      setTimeoutState(true);
    }, ms);

    return cancelTimeout;
  }, deps);

  return [() => timeoutState, cancelTimeout];
};
