import {
  imageFileNames,
  imageFirebaseFileNameMapper,
} from "@/components/hops/Section";
import api from "@/lib/axios";
import { storage } from "@/lib/firebase";
import { APIResponse } from "@/types/global.types";
import {
  getAllProducts,
  patchAllLanderImage,
  patchAllProductImage,
} from "@/utils/utility";
import { AxiosResponse } from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Session } from "next-auth";
import toast from "react-hot-toast";

const handleAPIError = (errorResponse: any) => {
  if (errorResponse.error) {
    console.error("Developer Message:", errorResponse.developerMessage);
    toast.error(errorResponse.displayMessage || "An error occurred");
    throw new Error(errorResponse.developerMessage);
  }
};

const handleUploadLogo = async (value: Record<string, any>) => {
  try {
    const uploadPromises: Promise<any>[] = [];
    imageFileNames.forEach((fileName) => {
      if (typeof value[fileName] !== "string") {
        const fName = value[fileName].name as string;
        const storageRef = ref(
          storage,
          `images/${value[imageFirebaseFileNameMapper(fileName)]}.${fName.split(".").pop()}`
        );
        const uploadPromise = uploadBytes(storageRef, value[fileName]);
        uploadPromises.push(uploadPromise);
      }
    });
    await Promise.all(uploadPromises);
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
    throw error;
  }
};

export const handleUploadProductImage = async (
  value: File | string,
  brandName: string
) => {
  try {
    if (typeof value !== "string") {
      const fName = value.name as string;
      const storageRef = ref(
        storage,
        `${brandName.split(" ").join("_")}/products/${fName.split(".").pop()}`
      );
      await uploadBytes(storageRef, value);
      const downloadUrl = await getDownloadURL(storageRef);
      value = downloadUrl;
      return value;
    }
    return "";
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Something went wrong");
    throw error;
  }
};

export const createHop = async (session: Session | null, value: any) => {
  if (session && session.user && session.user.access_token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      };
      const updatedValue = await handleUploadLogo(value);
      const payload: AxiosResponse<APIResponse> = await api.post(
        "hop/create",
        updatedValue,
        config
      );
      handleAPIError(payload.data);
      return payload.data.response;
    } catch (error) {
      console.error("Error creating hop:", error);
      throw error;
    }
  }
};

export const getSavedHops = async (session: Session | null) => {
  if (session && session.user && session.user.access_token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      };
      const payload: AxiosResponse<APIResponse> = await api.get(
        "hop/saved-hop/all",
        config
      );
      handleAPIError(payload.data);
      return payload.data.response?.hops;
    } catch (error) {
      console.error("Error fetching hops:", error);
      throw error;
    }
  }
};

export const getReleasedHops = async (session: Session | null) => {
  if (session && session.user && session.user.access_token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      };
      const payload: AxiosResponse<APIResponse> = await api.get(
        "hop/all/published",
        config
      );
      handleAPIError(payload.data);
      return payload.data.response?.hops;
    } catch (error) {
      console.error("Error fetching hops:", error);
      throw error;
    }
  }
};

export const getSingleSavedHop = async (
  session: Session | null,
  id: string
) => {
  if (session && session.user && session.user.access_token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      };
      const payload: AxiosResponse<APIResponse> = await api.get(
        `hop/saved-hop/${id}`,
        config
      );
      handleAPIError(payload.data);
      return payload.data.response;
    } catch (error) {
      console.error("Error fetching hop:", error);
      throw error;
    }
  }
};

export const getHopFromLink = async (link: string) => {
  try {
    const payload: AxiosResponse<APIResponse> = await api.get(
      `hop/published/${link}`
    );
    handleAPIError(payload.data);
    return payload.data.response;
  } catch (error) {
    console.error("Error fetching hop:", error);
    throw error;
  }
};

export const saveHop = async (
  session: Session | null,
  publish: boolean,
  id: string,
  value: Record<string, any>
) => {
  if (session && session.user && session.user.access_token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      };
      const updatedProductValue = await patchAllProductImage(value);
      const updatedValue = await patchAllLanderImage(updatedProductValue);
      const allProducts = getAllProducts(updatedValue);
      const payload: AxiosResponse<APIResponse> = await api.post(
        `hop/saved-hop/save/${id}`,
        {
          blueprint: JSON.stringify(updatedValue) || "",
          products: allProducts,
          publish,
        },
        config
      );
      handleAPIError(payload.data);
      return payload.data.response;
    } catch (error) {
      console.error("Error saving hop:", error);
      throw error;
    }
  }
};
