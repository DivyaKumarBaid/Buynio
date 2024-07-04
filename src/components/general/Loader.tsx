import React from "react";

const Loader = () => {
  return (
    <div className="w-[100vw] h-[100h] flex justify-center items-center absolute">
      <div className="text-xl text-white animate-pulse flex items-center justify-center w-full h-[100vh]">
        Loading ...{" "}
      </div>
    </div>
  );
};

export default Loader;
