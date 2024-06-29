import React from "react";
import styled from "styled-components";
import { ToggleButtonInputType } from "../types/input.types";

const ToggleBtn = styled.div<{ $bgColor: string }>`
  background: ${(props) => props.$bgColor};
`;

const ToggleButton = ({
  value,
  header,
  subHeading,
  name,
  type,
  onChange,
  flexEnd
}: ToggleButtonInputType) => {
  return (
    <div className={`flex items-center gap-2 max-w-[300px] text-md text-[var(--text-secondary-color)] mx-4 my-2 ${flexEnd && 'w-full justify-between'}`}>
      <div className="flex flex-col gap-1">
        <div
          className={`text-[var(--text-primary-color)] ${subHeading! && "text-sm"}`}
        >
          {header}
        </div>
        {subHeading! && (
          <div className="text-[var(--text-secondary-color)] text-xs">
            {subHeading}
          </div>
        )}
      </div>
      <div
        className="relative min-w-[40px] ml-2 h-[20px] bg-[var(--card-border-hover-color)] rounded-3xl flex items-center  cursor-pointer"
        onClick={() => {
          const val = !value;
          const e = {
            target: {
              name,
              type,
              value: val,
            },
          };
          onChange(e);
        }}
        style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)" }}
      >
        <ToggleBtn
          $bgColor={
            value ? "var(--text-primary-color)" : "var(--text-secondary-color)"
          }
          className="absolute w-[22px] h-[22px] rounded-[50%] border duration-300 transition-all"
          style={{
            left: value ? "calc(100% - 22px)" : "0",
            boxShadow: value ? "" : "inset 0 0 10px rgba(0,0,0,0.4)",
          }}
        />
      </div>
    </div>
  );
};

export default ToggleButton;
