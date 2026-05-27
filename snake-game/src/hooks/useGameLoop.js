import { useEffect, useRef } from 'react';

const useGameLoop = (callback, interval, running) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!running) return;

    const tick = () => {
      callbackRef.current();
    };

    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval, running]);
};

export default useGameLoop;
