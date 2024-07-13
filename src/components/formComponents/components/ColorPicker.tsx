"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Sketch from "react-color/lib/components/sketch/Sketch";
import { ColorPickerInputType } from "../types/input.types";

const ColorPicker = ({
  value,
  header,
  name,
  onChange,
  subHeading,
  flexEnd
}: ColorPickerInputType) => {
  return (
    <div className={`m-4 flex gap-4 text-md items-center max-w-[300px] ${flexEnd && 'w-full justify-between'}`}>
      <div className="flex flex-col gap-1">
        <div
          className={`text-[var(--text-primary-color)] ${subHeading! && "text-sm"}`}
        >
          {header}
        </div>
        {subHeading! && (
          <div className="text-[var(--text-secondary-color)] text-xs break-keep">
            {subHeading}
          </div>
        )}
      </div>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <div
            className="w-[25px] h-[25px] rounded-[4px] cursor-pointer border-[1px] border-[var(--text-secondary-low-color)]"
            style={{ background: value }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <Sketch
            color={value}
            className="border-[1px] border-[var(--text-secondary-low-color)]"
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
