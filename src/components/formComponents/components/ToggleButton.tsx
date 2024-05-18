import React from "react";
import styled from "styled-components";
import { ToggleButtonInputType } from "../types/input.types";

const ToggleBtn = styled.div<{ $bgColor: string }>`
  background: ${(props) => props.$bgColor};
`;

const ToggleButton = ({
  value,
  header,
  name,
  type,
  onChange,
}: ToggleButtonInputType) => {
  return (
    <div className="flex items-center gap-2 text-md md:text-xl text-[var(--text-secondary-color)]">
      <div>{header}</div>
      <div
        className="relative w-[5.5vh] m-2 h-[3vh] bg-[var(--card-border-hover-color)] rounded-3xl flex items-center  cursor-pointer"
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
      >
        <ToggleBtn
          $bgColor={
            value ? "var(--text-primary-color)" : "var(--text-secondary-color)"
          }
          className="absolute w-[3vh] h-[3vh] rounded-[50%] border duration-300 transition-all"
          style={{ left: value ? "calc(100% - 3vh)" : "0" }}
        />
      </div>
    </div>
  );
};

export default ToggleButton;
