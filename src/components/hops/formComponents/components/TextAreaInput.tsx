"use client";
import React, { useEffect, useRef } from "react";
import { TextAreaInputType } from "../types/input.types";

const TextAreaInput = ({
  name,
  value,
  onChange,
  placeholder,
  header,
  label,
  regexMatch,
  showError,
  errorTextForRegex,
  maxLength,
  rows,
  required,
  valueTransformer
}: TextAreaInputType) => {
  const [error, setError] = React.useState<boolean>(false);
  const [focus, setFocus] = React.useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // const focusInput = () => {
  //   if (inputRef.current) {
  //     inputRef.current?.focus();
  //   }
  // };

  useEffect(() => {
    setError(() => {
      if (value == "") return false;
      if (regexMatch) return !regexMatch.test(value);
      else return false;
    });
  }, [value]);

  return (
    <div className="w-min flex text-sm gap-2 flex-col relative m-4 pt-2 duration-300">
      {label! && (
        <div className="text-sm text-[var(--text-secondary-color)] ml-2">
          {label}
          {required ? <span className="ml-1 text-[red]">*</span> : null}
        </div>
      )}
      {header! && (
        <div
          className={`text-xs text-[var(--text-secondary-color)] bg-[var(--background-color)] ml-2 absolute top-[-2px] px-1 rounded-md`}
        >
          {header}
          {required ? <span className="ml-1 text-[red]">*</span> : null}
        </div>
      )}
      <div
        className={`flex justify-start items-center border-[1px] ${error ? "border-[var(--danger-secondary-low-color)]" : focus ? "border-[var(--input-focus-border)]" : "border-[var(--card-border-color)]"} rounded-md duration-300`}
      >
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e)=>{
            const newValue = valueTransformer(e.target.value || "");
            e.target.value = newValue;
            onChange(e);
          }}
          maxLength={maxLength}
          ref={inputRef}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`border-none outline-none bg-transparent min-w-[400px] placeholder-[var(--text-secondary-low-color)] placeholder-opacity-50 duration-500 p-4 resize-none`}
          rows={rows || 8}
        />
      </div>
      {error && showError && (
        <span className="text-[var(--danger-secondary-color)] ml-2 text-xs max-w-[100%] break-words duration-300 ">
          {errorTextForRegex}
        </span>
      )}
    </div>
  );
};

export default TextAreaInput;
