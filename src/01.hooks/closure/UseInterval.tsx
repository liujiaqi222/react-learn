import {  useEffect, useLayoutEffect, useRef, useState } from "react";

const useInterval = (fn: () => void, delay: number) => {
  const callbackFn = useRef(fn);
  const cleanUpRef = useRef<() => void>(null);

  const clean = () => {
    cleanUpRef.current?.();
  };
  useLayoutEffect(() => {
    callbackFn.current = fn;
  }, [fn]);

  useEffect(() => {
    const timer = setInterval(() => {
      callbackFn.current();
    }, delay);
    cleanUpRef.current = () => {
      clearInterval(timer);
    };
    return clean
  });
  return clean;
};

const UseInterval = () => {
  const [count, setCount] = useState(0);
  const updateCount = () => {
    setCount(count + 1);
  };
  useInterval(updateCount, 1000);
  return <div>{count}</div>;
};

export default UseInterval;

