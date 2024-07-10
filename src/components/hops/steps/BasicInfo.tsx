"use client";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { singleSectionType } from "../Section";
import Checkbox from "../../formComponents/components/Checkbox";
import ImapeUploader from "../../formComponents/components/ImapeUploader";
import NumberInput from "../../formComponents/components/NumberInput";
import TextAreaInput from "../../formComponents/components/TextAreaInput";
import TextInput from "../../formComponents/components/TextInput";
import { InputTypeEnum } from "../../formComponents/types/input.types";
import ColorPicker from "@/components/formComponents/components/ColorPicker";

type BasicInfoType = {
  value: Record<string, any>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  setContinueButton: Dispatch<SetStateAction<boolean>>;
  section: singleSectionType[];
};

const BasicInfo = ({
  value,
  handleChange,
  loading,
  setContinueButton,
  section,
}: BasicInfoType): React.JSX.Element => {
  const errorChecker = () => {
    let error = false;
    section.forEach((sect) => {
      sect.inputs.forEach((inp: any) => {
        switch (inp.type) {
          case InputTypeEnum.TEXT_AREA_INPUT:
            error =
              error ||
              (inp.required &&
                !!inp.regexMatch &&
                !inp.regexMatch.test(value[inp.name]));
            break;
          case InputTypeEnum.TEXT_INPUT:
            error =
              error ||
              (inp.required &&
                !!inp.regexMatch &&
                !inp.regexMatch.test(value[inp.name]));
            break;
          case InputTypeEnum.NUMBER_INPUT:
            error =
              error ||
              (inp.required &&
                !!inp.regexMatch &&
                !inp.regexMatch.test(value[inp.name]));
            break;
          case InputTypeEnum.IMAGE_UPLOADER:
            error = error || (value[inp.name] == null && inp.required);
            break;
          case InputTypeEnum.CHECKBOX_INPUT:
            if (inp.required) {
              if (inp.multiSelect) {
                error = error || value[inp.name].length > 0;
              } else {
                error = error || inp.options?.includes(value[inp.name]);
              }
            }
            break;
        }
      });
    });
    return error;
  };

  useEffect(() => {
    setContinueButton(errorChecker());
  }, [value, section]);

  return (
    <>
      {section.map((sect: singleSectionType, index: number) => {
        return (
          <div
            className="flex flex-col items-center w-full"
            key={sect.heading + index}
          >
            <div className="flex justify-between items-start w-[85%]">
              <div className="flex flex-col px-6 py-4 w-[50%]">
                <div className="text-2xl text-[var(--text-primary-color)] font-semibold tracking-wider">
                  {sect.heading}
                </div>
                <div className="text-md break-keep text-[var(--text-secondary-color)] tracking-wider w-3/4">
                  {sect.subHeading}
                </div>
              </div>
              <div className="flex flex-col w-[40%] items-start gap-4">
                {sect.inputs.map((inp: any, idx: number) => {
                  switch (inp.type) {
                    case InputTypeEnum.COLOR_PICKET_INPUT:
                      return (
                        <ColorPicker
                          {...{
                            ...inp,
                            value: value[inp.name],
                            onChange: handleChange}
                          }
                          key={inp.name + idx}
                        />
                      );
                    case InputTypeEnum.TEXT_INPUT:
                      return (
                        <TextInput
                          {...{
                            ...inp,
                            value: value[inp.name],
                            onChange: handleChange,
                          }}
                          key={inp.name + idx}
                        />
                      );
                    case InputTypeEnum.NUMBER_INPUT:
                      return (
                        <NumberInput
                          {...{
                            ...inp,
                            value: value[inp.name],
                            onChange: handleChange,
                          }}
                          key={inp.name + idx}
                        />
                      );
                    case InputTypeEnum.TEXT_AREA_INPUT:
                      return (
                        <TextAreaInput
                          {...{
                            ...inp,
                            value: value[inp.name],
                            onChange: handleChange,
                          }}
                          key={inp.name + idx}
                        />
                      );

                    case InputTypeEnum.IMAGE_UPLOADER:
                      return (
                        <ImapeUploader
                          {...{
                            ...inp,
                            loading,
                            onChange: handleChange,
                            value: value[inp.name],
                          }}
                          key={inp.name + idx}
                        />
                      );

                    case InputTypeEnum.CHECKBOX_INPUT:
                      return (
                        <Checkbox
                          {...{
                            ...inp,
                            onChange: handleChange,
                            value: value[inp.name],
                          }}
                          key={inp.name}
                        />
                      );
                  }
                })}
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-[--card-border-color] my-12"></div>
          </div>
        );
      })}
    </>
  );
};

export default BasicInfo;
