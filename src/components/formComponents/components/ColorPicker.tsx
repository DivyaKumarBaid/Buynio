"use client";
import React from "react";
import { BlockPicker } from "react-color";
import { ColorPickerInputType } from "../types/input.types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

const ColorPicker = ({
  value,
  header,
  name,
  onChange,
}: ColorPickerInputType) => {
  return (
    <div className="m-4 flex gap-4 text-md md:text-xl text-[var(--text-secondary-color)] items-center justify-center">
      <div>{header}</div>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <div
            className="w-[25px] h-[25px] rounded-[4px] cursor-pointer"
            style={{ background: value }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <BlockPicker
            triangle="hide"
            color={value}
            onChange={(ec) => {
              const e = {
                target: {
                  name,
                  type: "color-picker",
                  value: ec.hex,
                },
              };
              onChange(e);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPicker;
