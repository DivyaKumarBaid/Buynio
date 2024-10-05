import { createBaseValue, SwitchInput } from "@/components/formComponents/InputMapper";
import { InputTypeEnum } from "@/components/formComponents/types/input.types";
import useForm from "@/hooks/useForm";
import { barlow } from "@/lib/Fonts";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import React from "react";

export const addProduct = (onClose: () => void) => {
  return <AddProductCard onClose={onClose} />;
};

type AddProductCardProps = {
  onClose: () => void;
};

const addProductInputs = [
  {
    type: InputTypeEnum.TEXT_INPUT,
    name: "title",
    placeholder: "Product Title",
    header: "Product Title",
    subHeading: "Enter the title for the product",
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
    type: InputTypeEnum.TEXT_AREA_INPUT,
    name: "description",
    placeholder: "Product Description",
    header: "Product Description",
    subHeading: "Enter the description for the product",
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
    type: InputTypeEnum.NUMBER_INPUT,
    name: "price",
    placeholder: "Product Price",
    header: "Product Price",
    subHeading: "Enter the price for the product",
    tag: "Product Details",
    postText: "",
    preText: "₹",
    valueTransformer: (value: string) => value,
    showError: false,
    errorTextForRegex: "",
    regexMatch: null,
    required: true,
    maxLength: 10,
    min: 0,
  },
  {
    type: InputTypeEnum.TEXT_INPUT,
    name: "redirection",
    placeholder: "Redirection URL",
    header: "Redirection URL",
    subHeading: "Enter the URL to redirect when the product is clicked",
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
    type: InputTypeEnum.MULTI_TEXT_INPUT,
    name: "src",
    placeholder: "Image Source URLs",
    label: "Image Source URLs",
    subHeading: "Add the URLs for product images",
    valueTransformer: (value: string) => value,
    showError: false,
    errorTextForRegex: "",
    regexMatch: null,
    required: true,
    maximunFields: 5,
    tag: "Product Images",
    preText: "",
    postText: "",
  },
  {
    type: InputTypeEnum.COLOR_PICKER_INPUT,
    name: "background",
    header: "Background Color",
    subHeading: "Select the background color for the product",
    tag: "Product Design",
    flexEnd: true,
    required: true,
  },
];

const AddProductCard = ({ onClose }: AddProductCardProps) => {
  const [value, handleChange] = useForm(createBaseValue(addProductInputs));

  return (
    <>
      <ModalHeader
        className={`flex flex-col gap-2 border-b-[1px] mb-2 border-[var(--card-border-color)]`}
      >
        <h1
          className={`${barlow.className} !text-[var(--text-secondary-color)] tracking-widest`}
        >
          Select a new section you want to add.
        </h1>
      </ModalHeader>
      <ModalBody className="max-h-[50vh] overflow-auto">
        <div className="flex flex-col gap-2">
          {addProductInputs.map((input: Record<string, any>, index: number) => {
            return (
              <SwitchInput
                input={input}
                inputKey={
                  input.name +
                  index
                }
                handleChange={handleChange}
                value={value}
                key={`setting${index}`}
              />
            );
          })}
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
          onClick={onClose}
        >
          Save
        </div>
      </ModalFooter>
    </>
  );
};
