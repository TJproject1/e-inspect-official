import React from "react";

function ToastNotification({ message, type }) {
  const colors =
    type === "error"
      ? "text-red-500 bg-red-200"
      : "text-green-500 bg-green-200";
  return (
    <p
      className={`${
        message
          ? `opacity-100 p-1 w-fit h-7 mt-6 mx-auto text-sm text-center ${colors} rounded-sm`
          : "opacity-0 w-0 h-0"
      } overflow-hidden transition-all duration-150`}
    >
      {message}
    </p>
  );
}

export default ToastNotification;
