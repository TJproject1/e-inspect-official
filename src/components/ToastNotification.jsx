import React from "react";

function ToastNotification({ message, type, style = {} }) {
  const colors =
    type === "error"
      ? "text-red-500 bg-red-200"
      : "text-green-500 bg-green-200";
  return (
    <p
      className={`${
        message
          ? `opacity-100 p-2 w-fit h-9 mt-6 mx-auto text-sm text-center ${colors} rounded-sm`
          : "opacity-0 w-0 h-0"
      } overflow-hidden transition-all duration-150`}
      style={style}
    >
      {message}
    </p>
  );
}

export default ToastNotification;
