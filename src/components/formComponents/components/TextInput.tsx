"use client";
import useThrottleQuery from "@/hooks/useThrottleQuery";
import { debounceFunctions } from "@/lib/constants";
import React, { useEffect, useRef } from "react";
import { TbLoader2 } from "react-icons/tb";
import { DebounceFunctionsEnum, TextInputType } from "../types/input.types";

const TextInput = ({
  name,
  value,
  onChange,
  placeholder,
  preText,
  postText,
  header,
  label,
  regexMatch,
  valueTransformer,
  showError,
  errorTextForRegex,
  maxLength,
  required,
  customIcon,
  shouldCallAPIOnChange,
}: TextInputType) => {
  const [error, setError] = React.useState<boolean>(false);
  const [focus, setFocus] = React.useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    data,
    isPending,
    error: queryError,
    throttledMutate
  } = useThrottleQuery(
    shouldCallAPIOnChange?.key || "",
    debounceFunctions[
      shouldCallAPIOnChange?.serviceFunctionKey || DebounceFunctionsEnum.UNKNOWN
    ],
    shouldCallAPIOnChange?.debouceTime ?? 3000
  );

  // const focusInput = () => {
  //   if (inputRef.current) {
  //     inputRef.current?.focus();
  //   }
  // };

  useEffect(() => {
    setError(() => {
      if (value == "") return false;
      if (queryError) return false;
      if (regexMatch) return !regexMatch.test(value);
      else return false;
    });
  }, [value, queryError]);

  return (
    <div className="w-min flex text-sm gap-2 flex-col relative my-1 mx-4 pt-2 duration-300">
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
        className={`flex justify-start items-center border-[1px] ${error ? "border-[var(--danger-secondary-low-color)]" : focus ? "border-[var(--input-focus-border)]" : "border-[var(--card-border-color)]"} rounded-md duration-300 min-w-[300px]`}
      >
        {customIcon}
        {preText! && (
          <div
            className={`text-[var(--text-secondary-color)] text-md bg-[var(--pretext-bg-color)] rounded-l-md py-3 px-4 border-r-[1px] ${error ? "border-[var(--danger-secondary-low-color)]" : "border-[var(--card-border-color)]"} duration-300 w-max text-nowrap`}
          >
            {preText}
          </div>
        )}
        <input
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            const newValue = valueTransformer(e.target.value || "");
            e.target.value = newValue;
            if (shouldCallAPIOnChange) {
              throttledMutate({ [shouldCallAPIOnChange.key]: newValue });
            }
            onChange(e);
          }}
          maxLength={maxLength}
          ref={inputRef}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`border-none outline-none w-full bg-transparent placeholder-[var(--text-secondary-low-color)] placeholder-opacity-50 duration-500 ${(preText?.trim() == "" || postText?.trim() == "") && "py-3 px-4"}`}
        />
        {postText! && (
          <div
            className={`text-[var(--text-secondary-color)] text-md bg-[var(--card-border-color)] rounded-r-md py-3 px-4 border-l-[1px] ${showError && error ? "border-[var(--danger-secondary-low-color)]" : "border-[var(--card-border-color)]"} duration-300 w-max`}
          >
            {postText}
          </div>
        )}
        {shouldCallAPIOnChange?.showLoader && isPending && (
            <TbLoader2 className="animate-spin duration-500 text-4xl" />
        )}
      </div>
      {error && showError && (
        <span className="text-[var(--danger-secondary-color)] ml-2 text-xs max-w-[100%] break-words duration-300 ">
          {errorTextForRegex}
        </span>
      )}
      {shouldCallAPIOnChange?.shouldShowError && queryError && (
        <span className="text-[var(--danger-secondary-color)] ml-2 text-xs max-w-[100%] break-words duration-300 ">
          {queryError.message}
        </span>
      )}
      {shouldCallAPIOnChange?.shouldShowSuccess && data && (
        <span className="text-[var(--danger-secondary-color)] ml-2 text-xs max-w-[100%] break-words duration-300 ">
          {data.message}
        </span>
      )}
    </div>
  );
};

export default TextInput;
