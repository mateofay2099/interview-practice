import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number | null) => {
  const intervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (delay) {
      intervalRef.current = setInterval(callback, delay);
    }

    if (!delay && intervalRef.current) {
      return clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [delay, callback]);

  return null;
};
