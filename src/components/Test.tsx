"use client";
import { getProviders, signOut } from "next-auth/react";
import FormButton from "./general/FormButton";

const Test = () => {
  return (
    <>
      <FormButton
        text={"SIGNOUT"}
        disabled={false}
        onClickFunc={() => signOut()}
      />
    </>
  );
};

export default Test;
