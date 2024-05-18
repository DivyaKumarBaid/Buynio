"use client";
import ToggleButton from "@/components/formComponents/components/ToggleButton";
import { InputTypeEnum } from "@/components/formComponents/types/input.types";
import FileUpload from "@/components/Test";
import React from "react";

export default async function Home() {

  return (
    <div>
      {/* {JSON.stringify(user)} */}
      <FileUpload/>
      <ToggleButton {...{
        name: "Test",
        value: false,
        header: "Test",
        onChange: (e) => console.log({e}),
        type: InputTypeEnum.TOGGLE_BUTTON_INPUT
      }}/>
    </div>
  );
}
