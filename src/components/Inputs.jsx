import React from "react";

export function TextInput({ name, type, onChange, value, ...props }) {
  return (
    <label htmlFor={name}>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    </label>
  );
}
