import { useRef, useState } from "react";

const UseRef = () => {
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);
  const intervalRef = useRef<number>(0);
  const secondPassed = ((now - startTime) / 1000).toFixed(3);
  const handleStart = () => {
    const now = Date.now();
    setStartTime(now);
    setNow(now);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  };
  const handleStop = () => {
    clearInterval(intervalRef.current);
  };
  return (
    <div>
      <h1>Time Passed:{secondPassed}</h1>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
    </div>
  );
};

export default UseRef;
