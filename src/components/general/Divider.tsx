import React from "react";

const Divider = () => {
  return (
    <div className="flex justify-center items-center gap-4 w-full">
      <div className="w-full h-[1px] bg-[rgb(var(--text-secondary-color))]"></div>
      <div className="w-max break-keep text-[rgb(var(--text-secondary-color))]">
        or
      </div>
      <div className="w-full h-[1px] bg-[rgb(var(--text-secondary-color))]"></div>
    </div>
  );
};

export default Divider;
