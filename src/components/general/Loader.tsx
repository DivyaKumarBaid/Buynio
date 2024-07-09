import React from "react";

const Loader = () => {
  return (
    <div className="max-w-[100vw] max-h-[100vh] flex flex-col gap-6 p-8">
      {/* <div className="text-xl text-white animate-pulse flex items-center justify-center w-full h-[100vh]">
        Loading ...
      </div> */}
      <div className="w-1/3 h-[30px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
      <div className="flex gap-6">
        <div className="w-[200px] h-[200px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
        <div className="w-[200px] h-[200px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
        <div className="w-[200px] h-[200px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
        <div className="w-[200px] h-[200px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
      </div>
      <div className="w-3/6 h-[50px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
      <div className="w-2/5 h-[50px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
      <div className="flex gap-6">
        <div className="w-[200px] h-[200px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
        <div className="w-[200px] h-[200px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
        <div className="w-[200px] h-[200px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
        <div className="w-[200px] h-[200px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
      </div>
      <div className="w-2/5 h-[50px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
      <div className="w-3/5 h-[50px] bg-[var(--text-secondary-low-color)] rounded-lg opacity-40 animate-pulse"></div>
    </div>
  );
};

export default Loader;
