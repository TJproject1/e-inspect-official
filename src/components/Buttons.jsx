import React from "react";
import { ImSpinner } from "react-icons/im";

export const PrimaryButton = ({ type, text, loading, ...props }) => {
  return (
    <button type={type} {...props}>
      {loading ? <ImSpinner className="w-6 h-6 mx-auto animate-spin" /> : text}
    </button>
  );
};
