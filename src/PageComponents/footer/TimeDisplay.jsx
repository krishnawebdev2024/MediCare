import React, { useEffect, useState } from "react";

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      const utcTime = new Date(
        new Date().getTime() + new Date().getTimezoneOffset() * 60000
      );
      const gmtPlusOneTime = new Date(utcTime.getTime() + 1 * 3600000);
      setCurrentTime(gmtPlusOneTime);
    }, 1000); // Update the time every second

    return () => clearInterval(timerId); // Cleanup on unmount
  }, []);

  return (
    <div className="text-center text-slate-400">
      <p className="text-sm">
        {currentTime.toLocaleTimeString("de-DE")}{" "}
        <span className="text-xs">(GMT+1)</span>
      </p>
    </div>
  );
};

export default TimeDisplay;
