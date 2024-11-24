import {
  createBaseValue,
  SwitchInput,
} from "@/components/formComponents/InputMapper";
import { GlobalInputIncomingType, ImageFileUploaderIncomingType, InputTypeEnum } from "@/components/formComponents/types/input.types";
import useForm from "@/hooks/useForm";
import { barlow } from "@/lib/Fonts";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import React from "react";

type AddProductCardProps = {
  onClose: () => void;
  onSave: (value:Record<string,any>) => void;
};

export const addProductProxy = (onSave: (value:Record<string,any>) => void) => {
  return (onClose: () => void) => <AddProductCard onSave={onSave} onClose={onClose}/>
}

const imageInput: GlobalInputIncomingType = {
  name: "src",
  error: "",
  type: InputTypeEnum.IMAGE_UPLOADER,
  required: true,
}

const addProductInputs: GlobalInputIncomingType[] = [
  {
    type: InputTypeEnum.TEXT_INPUT,
    name: "title",
    placeholder: "Product Title",
    header: "Product Title",
    tag: "Product Details",
    preText: "",
    postText: "",
    label: "",
    valueTransformer: (value: string) => value,
    showError: false,
    errorTextForRegex: "",
    regexMatch: null,
    required: true,
  },
  {
    type: InputTypeEnum.TEXT_AREA_INPUT,
    name: "description",
    placeholder: "Product Description",
    header: "Product Description",
    tag: "Product Details",
    valueTransformer: (value: string) => value,
    showError: false,
    errorTextForRegex: "",
    regexMatch: null,
    required: true,
    label: ""
  },
  {
    type: InputTypeEnum.NUMBER_INPUT,
    name: "price",
    placeholder: "Product Price",
    header: "Product Price",
    tag: "Product Details",
    postText: "",
    preText: "₹",
    valueTransformer: (value: string) => value,
    showError: false,
    errorTextForRegex: "",
    regexMatch: null,
    required: true,
    min: 0,
    label: ""
  },
  {
    type: InputTypeEnum.TEXT_INPUT,
    name: "redirection",
    placeholder: "Redirection URL",
    header: "Redirection URL",
    label: "",
    tag: "Product Details",
    preText: "",
    postText: "",
    valueTransformer: (value: string) => value,
    showError: false,
    errorTextForRegex: "",
    regexMatch: null,
    required: true,
  },
  {
    type: InputTypeEnum.COLOR_PICKER_INPUT,
    name: "background",
    header: "Background Color",
    subHeading: "Select the background color for the product",
    tag: "Product Design",
    flexEnd: true,
  },
];

export const AddProductCard = ({ onClose, onSave }: AddProductCardProps) => {
  const [value, handleChange] = useForm(createBaseValue([...addProductInputs, imageInput]));

  return (
    <>
      <ModalHeader
        className={`flex flex-col gap-2 border-b-[1px] mb-2 border-[var(--card-border-color)]`}
      >
        <h1
          className={`${barlow.className} !text-[var(--text-secondary-color)] tracking-widest`}
        >
          Add a new product
        </h1>
      </ModalHeader>
      <ModalBody className="max-h-[60vh] w-max overflow-y-auto">
        <div className="flex justify-between w-full h-full">
          <SwitchInput
            input={imageInput}
            inputKey={imageInput.name}
            handleChange={handleChange}
            value={value}
            key={`setting${imageInput.name}`}
          />
          <div className="flex flex-col gap-2">
            {addProductInputs.map(
              (input: Record<string, any>, index: number) => {
                return (
                  <SwitchInput
                    input={input}
                    inputKey={input.name + index}
                    handleChange={handleChange}
                    value={value}
                    key={`setting${index}`}
                  />
                );
              }
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="w-full flex justify-end border-t-[1px] border-[var(--card-border-color)] gap-4">
        <div
          className="border-[1px] text-sm border-[var(--card-border-color)] text-[var(--text-secondary-color)] hover:text-[var(--text-primary-color)] hover:border-[var(--card-border-hover-color)] duration-200 rounded-md p-2 cursor-pointer"
          onClick={onClose}
        >
          Cancel
        </div>
        <div
          className="border-[1px] bg-[var(--success-bg-light-color)] text-sm border-[var(--card-border-color)] text-[var(--text-primary-color)] hover:bg-[var(--success-bg-color)] hover:border-[var(--card-border-hover-color)] duration-200 rounded-md p-2 cursor-pointer"
          onClick={(ev) => {
              onSave(value);
              onClose();
            }}
        >
          Save
        </div>
      </ModalFooter>
    </>
  );
};
