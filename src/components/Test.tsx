"use client";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import FormButton from "./general/FormButton";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <input type="file" onChange={handleChange} disabled={loading} />
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
          toast('Here is your toast.');
        }}
        text="Clickme"
        disabled={false}
      />
    </div>
  );
};

export default FileUpload;
