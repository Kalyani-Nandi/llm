import React, { useEffect, useState } from "react";
import ErrorIcon from "./icons/ErrorIcon";
import WarningIcon from "./icons/WarningIcon";
import SuccessIcon from "./icons/SuccessIcon";
import InfoIcon from "./icons/WarningIcon";
import NotificationIcon from "./icons/SuccessIcon";

const Toast = ({ type = "info", message, title, duration = 5000, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          onClose();
          return 100;
        }
        return oldProgress + 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  const toastStyles = {
    error: { icon: <ErrorIcon />, color: "red" },
    warning: { icon: <WarningIcon />, color: "orange" },
    info: { icon: <InfoIcon />, color: "blue" },
    success: { icon: <SuccessIcon />, color: "green" },
    notification: { icon: <NotificationIcon />, color: "gray" },
  };

  const currentToastStyle = toastStyles[type] || toastStyles.info;
  return (
    <div
      className={`max-w-sm w-full mb-4 rounded-md shadow-lg text-white border-${currentToastStyle?.color}-500 p-4 relative bg-${currentToastStyle?.color}-500`}
    >
      <div className="flex items-start gap-3">
        <div className="mr-2">{currentToastStyle?.icon}</div>{" "}
        {/* Render the icon here */}
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
        <button onClick={onClose}>
          <svg
            fill="red"
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
      <div
        className={`absolute bottom-0 left-0 h-1 bg-${currentToastStyle?.color}-200`}
        style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
      ></div>
    </div>
  );
};

export default Toast;
