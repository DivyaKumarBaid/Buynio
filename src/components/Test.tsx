"use client";
import useForm from "@/hooks/useForm";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { signOut } from "next-auth/react";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import MultiTextMultiInput from "./formComponents/components/MultiTextMultiInput";
import { InputTypeEnum } from "./formComponents/types/input.types";
import FormButton from "./general/FormButton";

const FileUpload: React.FC = () => {
  const [value, handleChange] = useForm({
    testing: [{ companyName: "", companyName1: "" }],
  });

  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
    setError(null); // Clear any previous errors
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image file to upload.");
      return;
    }

    setLoading(true);

    try {
      const storageRef = ref(storage, `images/${selectedFile.name}`); // Create a reference with a unique path
      await uploadBytes(storageRef, selectedFile); // Upload the file
      // const downloadUrl = await getDownloadURL(storageRef); // Get the download URL

      setLoading(false);
      setSelectedFile(null); // Clear the selected file
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred during upload. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChanges} disabled={loading} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>
      {error && <p className="error">{error}</p>}
      <FormButton
        onClickFunc={() => {
          signOut({ callbackUrl: "/home/login" });
        }}
        text="signout"
        disabled={false}
      />
      <FormButton
        onClickFunc={() => {
          // enqueueSnackbar("I love hooks");
          toast("Here is your toast.");
        }}
        text="Clickme"
        disabled={false}
      />

      {/* <MultiInput
        type={InputTypeEnum.MULTI_TEXT_INPUT}
        name={"testing"}
        placeholder={"Testing"}
        preText={""}
        postText={""}
        label={"Multi"}
        valueTransformer={(e) => e}
        showError={false}
        errorTextForRegex={""}
        regexMatch={null}
        required={true}
        maximunFields={10}
        onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>)}
        value={value["testing"]}
        multiTextMultiInput={false}
      /> */}

      <MultiTextMultiInput
        type={InputTypeEnum.MULTI_TEXT_MULTI_INPUT}
        name={"testing"}
        label={"Multi"}
        required={true}
        maximunFields={10}
        onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>)}
        value={value["testing"]}
        structure={[
          {
            type: InputTypeEnum.TEXT_INPUT,
            placeholder: "Company's public name",
            regexMatch: /^[a-zA-Z0-9\s]{3,20}$/,
            name: "companyName",
            preText: "",
            postText: "",
            header: "Company Name",
            label: "",
            valueTransformer: (value: string) => value,
            showError: false,
            errorTextForRegex:
              "The name must contain atleast 3 characters and atmax 15 and must not include any special characters",
            maxLength: 20,
            required: true,
          },
          {
            type: InputTypeEnum.TEXT_INPUT,
            placeholder: "Company's public name",
            regexMatch: /^[a-zA-Z0-9\s]{3,20}$/,
            name: "companyName1",
            preText: "",
            postText: "",
            header: "Company Name",
            label: "",
            valueTransformer: (value: string) => value,
            showError: false,
            errorTextForRegex:
              "The name must contain atleast 3 characters and atmax 15 and must not include any special characters",
            maxLength: 20,
            required: true,
          },
        ]}
      />
    </div>
  );
};

export default FileUpload;
