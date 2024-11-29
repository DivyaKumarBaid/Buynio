import React from "react";
import { LanderProps } from "./Lander.types";
import { SECTION_TYPE } from "@/types/mapper.types";
import { PiImage } from "react-icons/pi";
import Image from "next/image";
import ImageUploader from "@/components/formComponents/components/ImageUploader";
import { InputTypeEnum } from "@/components/formComponents/types/input.types";

const Lander_V1 = (props: LanderProps) => {
  const bgImage = props.config.src;
  const UploadSection =
    bgImage == null || (typeof bgImage == "string" && bgImage == "") ? (
      <div className="min-h-[90vh] flex justify-center items-center">
        <PiImage className="text-[150px] invert opacity-75" />
        <ImageUploader
          name={"src"}
          error={""}
          type={InputTypeEnum.IMAGE_UPLOADER}
          required={false}
          loading={false}
          onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
            const newConfig = props;
            newConfig.config.src = e.target.files?.[0] || "";
            props.updateFuncs.handleUpdateLander(newConfig, props.subType);
          }}
          value={undefined}
        />
        <span className="text-white">Place your banner here</span>
      </div>
    ) : null;

  console.log(bgImage);

  return (
    <div
      className={`w-full h-max flex justify-center items-center`}
      onClick={(e) => {
        if (props.isSelectMode && props.setSelectedElement) {
          e.stopPropagation();
          props.setSelectedElement({
            type: SECTION_TYPE.LANDER,
            subType: props.subType,
          });
        }
      }}
    >
      {UploadSection || (
        <Image
          src={typeof bgImage == "string"? bgImage:URL.createObjectURL(new Blob([bgImage]))
          }
          width={1080}
          height={1920}
          alt="Picture of the author"
          className="!w-full !h-max"
        />
      )}
    </div>
  );
};

export default Lander_V1;
