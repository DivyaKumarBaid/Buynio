"use client";
import { PiImage } from "react-icons/pi";
import { ImageFileUploaderType } from "../types/input.types";

const ImageUploader = ({
  value,
  name,
  loading,
  onChange,
  error,
}: ImageFileUploaderType) => {
  return (
      <div className="flex flex-col justify-start items-start gap-2 w-full m-4 min-h-[150px]">
        <label
          htmlFor="file-upload"
          className="hover:text-[var(--text-primary-color)] text-[var(--text-secondary-color)] border-dotted border-[1px] border-[var(--card-border-color)] p-4 rounded cursor-pointer transition duration-300 min-h-[150px] w-max"
        >
          {value ? <img src={typeof value === "string" ? value : URL.createObjectURL(value)} alt="check" className="max-h-[150px]"/> :
            <PiImage className="text-[150px]"/>
          }
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          name={name}
          onChange={onChange}
          disabled={loading}
        />
        {error && <p className="error">{error}</p>}
      </div>
  );
};

export default ImageUploader;
