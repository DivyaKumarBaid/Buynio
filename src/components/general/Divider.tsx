import React from "react";

export const Divider = () => {
  return (
    <div className="flex justify-center items-center gap-4 w-full">
      <div className="w-full h-[1px] bg-[var(--text-secondary-color)]"></div>
      <div className="w-max break-keep text-[var(--text-secondary-color)]">
        or
      </div>
      <div className="w-full h-[1px] bg-[var(--text-secondary-color)]"></div>
    </div>
  );
};

export const HorizontalDivider = () => {
  return (
      <div className="w-full h-[1px] bg-[var(--card-border-color)] my-2"/>
  );
};

export default Divider;
