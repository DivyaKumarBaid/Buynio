import React from "react";

type SavedCardType = {
  name: string;
  background: string;
  createdAt: Date;
  updatedAt: Date;
  tag: string;
  logo: string;
};

const SavedCard = (props: SavedCardType) => {
  return (
    <div
      className="w-[15vw] min-w-[200px] h-[15vw] min-h-[200px] rounded-md border"
      style={{ background: props.background }}
    ></div>
  );
};

export default SavedCard;
