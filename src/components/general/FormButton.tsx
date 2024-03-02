
'use client'
import React from "react";

type ButtonProps = {
  text: string;
  onClickFunc: () => void;
  disabled: Boolean;
};

const FormButton = ({ text, onClickFunc, disabled }: ButtonProps) => {
  return (
    <button
      className={`text-sm cursor-pointer ${
        disabled ? "bg-[rgb(var(--text-secondary-color))]" : "bg-white"
      } mt-2 text-black rounded-lg hover:bg-white duration-500 w-full p-2 text-center`}
      onClick={() => !disabled && onClickFunc()}
    >
      {text}
    </button>
  );
};

export default FormButton;
