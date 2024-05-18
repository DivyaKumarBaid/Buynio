import {
  imageFileNames,
  imageFirebaseFileNameMapper,
} from "@/components/hops/Section";
import api from "@/lib/axios";
import { storage } from "@/lib/firebase";
import { AxiosResponse } from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Session } from "next-auth";
import toast from "react-hot-toast";

const handleUploadFile = async (value: Record<string, any>) => {
  try {
    // Array to hold all upload promises
    const uploadPromises: Promise<any>[] = [];

    // Iterate over each image file name
    imageFileNames.forEach((fileName) => {
      if (typeof value[fileName] !== "string") {
        const fName = value[fileName].name as string;
        const storageRef = ref(
          storage,
          `images/${value[imageFirebaseFileNameMapper(fileName)]}.${fName.split(".").pop()}`
        ); // Create a reference with a unique path

        // Push each upload promise to the array
        const uploadPromise = uploadBytes(storageRef, value[fileName]);
        uploadPromises.push(uploadPromise);
      }
    });

    // Wait for all file uploads to complete
    await Promise.all(uploadPromises);

    // Once all uploads are complete, update file URLs in value object
    for (const fileName of imageFileNames) {
      if (typeof value[fileName] !== "string") {
        const storageRef = ref(
          storage,
          `images/${value[imageFirebaseFileNameMapper(fileName)]}.${value[fileName].name.split(".").pop()}`
        );
        const downloadUrl = await getDownloadURL(storageRef);
        value[fileName] = downloadUrl;
      }
    }

    return value;
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Something went wrong");
    throw error; // Rethrow the error to propagate it
  }
};

export const createHop = async (session: Session | null, value: any) => {
  if (session && session.user && session.user.refresh_token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${session.user.refresh_token}`,
        },
      };

      // Upload files and update value object with download URLs
      const updatedValue = await handleUploadFile(value);

      // Make API call with updated value containing file URLs
      const payload: AxiosResponse<any, any> = await api.post(
        "hop/create",
        updatedValue,
        config
      );

      console.log(payload.data);
      return payload.data;
    } catch (error) {
      console.error("Error creating hop:", error);
      throw error; // Rethrow the error to propagate it
    }
  }
};
