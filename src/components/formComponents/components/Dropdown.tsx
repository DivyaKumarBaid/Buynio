"use client";
import {
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown as NextUIDropdown
} from "@nextui-org/react";
import React from "react";
import { FaChevronDown } from "react-icons/fa6";
import { DropdownInputType } from "../types/input.types";

const Dropdown = ({
  onChange,

  // value,
  // tag,
  name,
  preText,
  postText,
  header,
  label,
  required,
  multiSelect,
  options,
}: DropdownInputType) => {
  const [focus, setFocus] = React.useState<boolean>(false);

  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
    new Set([options[0]?.label || ""])
  );

  function handleSelectionChange(keys: string | string[] | Set<any>) {
    console.log(keys);
    let val;
    if (typeof keys === "string") {
      val = options.find((opt) => opt.label === keys);
      setSelectedKeys(new Set([keys]));
    } else if (Array.isArray(keys)) {
      val = options.filter((opt) => keys.includes(opt.label));
      setSelectedKeys(new Set(keys));
    } else {
      console.log("Keys", keys);
      setSelectedKeys(keys);
      val = keys;
    }

    // dummy call to forms hooks
    const e = {
      target: {
        name,
        type: "dropdown",
        value: val,
      },
    };
    onChange(e);
  }

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <NextUIDropdown onOpenChange={setFocus}>
      <DropdownTrigger>
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
            className={`flex justify-start items-center border-[1px] ${focus ? "border-[var(--input-focus-border)]" : "border-[var(--card-border-color)]"} rounded-md duration-300 min-w-[300px]`}
          >
            {preText! && (
              <div
                className={`text-[var(--text-secondary-color)] text-md bg-[var(--pretext-bg-color)] rounded-l-md py-3 px-4 border-r-[1px] border-[var(--card-border-color)] duration-300 w-max text-nowrap`}
              >
                {preText}
              </div>
            )}
            <button
              className={`border-none outline-none bg-[var(--card-bg-color)] w-full placeholder-[var(--text-secondary-low-color)] ${(preText.trim() == "" || postText.trim() == "") && "py-3 px-4 rounded-md"} flex justify-between`}
            >
              <span>{selectedValue}</span>
              <FaChevronDown
                className={`${focus ? "rotate-180" : "rotate-0"} duration-300`}
              />
            </button>
            {postText! && (
              <div
                className={`text-[var(--text-secondary-color)] text-md bg-[var(--card-border-color)] rounded-r-md py-3 px-4 border-l-[1px] border-[var(--card-border-color)] duration-300 w-max`}
              >
                {postText}
              </div>
            )}
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode={multiSelect ? "multiple" : "single"}
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        className="min-w-[300px] bg-[var(--card-bg-color)] shadow-xl rounded-md"
      >
        {options.map((opt) => {
          return <DropdownItem key={opt.value}>{opt.label}</DropdownItem>;
        })}
      </DropdownMenu>
    </NextUIDropdown>
  );
};

export default Dropdown;
