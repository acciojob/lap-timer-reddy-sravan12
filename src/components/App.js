import React, { useState, useEffect, useRef } from "react";

function App() {
  const [time, setTime] = useState(0); // time in centiseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  // Format time to mm:ss:cc
  const formatTime = (centiseconds) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;

    return `${padZero(minutes)}:${padZero(seconds)}:${padZero(cs)}`;
  };

  const padZero = (num) => (num < 10 ? `0${num}` : num);

  // Start the timer
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10); // every 10ms = 1 centisecond
    }
  };

  // Stop the timer
  const handleStop = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  // Reset the timer and laps
  const handleReset = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
    setLaps([]);
  };

  // Record the lap
  const handleLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, formatTime(time)]);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Lap Timer</h1>
      <h2>{formatTime(time)}</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleStop} disabled={!isRunning}>Stop</button>
        <button onClick={handleLap} disabled={!isRunning}>Lap</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <h3>Laps</h3>
      <ol>
        {laps.map((lap, index) => (
          <li key={index}>{lap}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
