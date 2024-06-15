"use client";
import React from "react";
import RippleButton from "../formComponents/components/Ripple";

type ButtonProps = {
  text: string;
  onClickFunc: () => void;
  disabled: boolean;
};

const FormButton = ({ text, onClickFunc, disabled }: ButtonProps) => {
  return (
    <RippleButton
      btnClass={`text-sm cursor-pointer ${
        disabled ? "bg-[var(--text-secondary-color)]" : "bg-white"
      } mt-2 text-black rounded-lg hover:bg-white duration-500 w-full p-2 text-center`}
      onClick={() => !disabled && onClickFunc()}
      rippleBackground="rgba(200,200,200,0.8)"
    >
      {text}
    </RippleButton>
  );
};

export default FormButton;
