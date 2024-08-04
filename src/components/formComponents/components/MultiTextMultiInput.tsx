"use client";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import {
  DummyEvent,
  InputTypeEnum,
  MultiTextMultiInputType,
} from "../types/input.types";
import RippleButton from "./Ripple";
import TextInput from "./TextInput";
import ColorPicker from "./ColorPicker"; // Ensure you have this component
import Dropdown from "./Dropdown"; // Ensure you have this component

const MultiTextMultiInput = ({
  value,
  name,
  onChange,
  label,
  required,
  maximunFields,
  structure,
}: MultiTextMultiInputType) => {
  const isEmptyValue = () => {
    return value?.some((inp) => {
      console.log(inp, "multitextmultiInp");
      return Object.keys(inp).some((k: string) => {
        if (typeof inp[k] == "string") {
          return inp[k].trim() === "";
        } else if (Array.isArray(inp[k])) {
          return inp[k].some((a: string) => a?.trim() === "");
        } else {
          return true;
        }
      });
    });
  };

  console.log({ value }, "multiTextMultiInput");

  const [isEmpty, setEmpty] = React.useState<boolean>(isEmptyValue());

  React.useEffect(() => {
    setEmpty(isEmptyValue());
  }, [value]);

  const handleChange = (index: number, structName: string, val: any) => {
    const newValue = value.map((v, i) =>
      i === index ? { ...v, [structName]: val } : v
    );

    const e = {
      target: {
        name,
        type: InputTypeEnum.MULTI_TEXT_MULTI_INPUT,
        value: newValue,
      },
    };
    onChange(e);
  };

  const handleAddField = () => {
    if (value.length < maximunFields) {
      const newValue = [...value, {}];
      structure.forEach((struct) => {
        newValue[newValue.length - 1][struct.name] =
          struct.type === InputTypeEnum.COLOR_PICKER_INPUT ? "#ffffff" : "";
      });
      const e = {
        target: {
          name,
          type: InputTypeEnum.MULTI_TEXT_MULTI_INPUT,
          value: newValue,
        },
      };
      onChange(e);
    }
  };

  const handleRemoveField = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    const e = {
      target: {
        name,
        type: InputTypeEnum.MULTI_TEXT_MULTI_INPUT,
        value: newValue,
      },
    };
    onChange(e);
  };

  const renderInput = (struct: any, index: number) => {
    const commonProps = {
      key: `${name}-${index}-${struct.name}`,
      name: `${name}[${index}][${struct.name}]`,
      placeholder: struct.placeholder,
      header: struct.header,
      label: struct.label,
      required: struct.required,
      maxLength: struct.maxLength,
      showError: struct.showError,
      errorTextForRegex: struct.errorTextForRegex,
      regexMatch: struct.regexMatch,
      value: value[index][struct.name],
      onChange: (e: any) => handleChange(index, struct.name, e.target.value),
    };

    switch (struct.type) {
      case InputTypeEnum.TEXT_INPUT:
        return (
          <TextInput
            {...commonProps}
            type={InputTypeEnum.TEXT_INPUT}
            preText={struct.preText || ""}
            postText={struct.postText || ""}
            valueTransformer={struct.valueTransformer}
          />
        );
      case InputTypeEnum.COLOR_PICKER_INPUT:
        return (
          <ColorPicker
            {...commonProps}
            type={InputTypeEnum.COLOR_PICKER_INPUT}
            value={value[index][struct.name] || "#ffffff"}
            onChange={(e: DummyEvent) =>
              handleChange(index, struct.name, e.target.value)
            }
          />
        );
      case InputTypeEnum.DROPDOWN_INPUT:
        return (
          <Dropdown
            {...commonProps}
            preText={struct.preText || ""}
            postText={struct.postText || ""}
            type={InputTypeEnum.DROPDOWN_INPUT}
            multiSelect={struct.multiSelect || false}
            options={struct.options || []}
            onChange={(e: DummyEvent) =>
              handleChange(index, struct.name, e.target.value)
            }
          />
        );
      default:
        return (
          <TextInput
            {...commonProps}
            type={InputTypeEnum.TEXT_INPUT}
            preText={struct.preText || ""}
            postText={struct.postText || ""}
            valueTransformer={struct.valueTransformer}
          />
        );
    }
  };

  return (
    <div className="flex flex-col w-min gap-2">
      {label && (
        <div className="text-sm text-[var(--text-secondary-color)] mx-4 mb-2">
          {label}
          {required && <span className="ml-1 text-red">*</span>}
        </div>
      )}
      {value?.map((input, index) => (
        <div
          className="flex items-center bg-[var(--card-bg-color)] rounded-md py-2 w-min relative"
          key={`${name}-${index}-${InputTypeEnum.MULTI_TEXT_MULTI_INPUT}`}
        >
          {required && value.length <= 1 ? null : (
            <MdOutlineCancel
              onClick={() => handleRemoveField(index)}
              className="text-xl absolute cursor-pointer top-2 right-2 text-[var(--text-secondary-color)] hover:text-[var(--text-primary-color)]"
            />
          )}
          <div className="flex items-center flex-wrap">
            {structure?.map((struct) => renderInput(struct, index))}
          </div>
        </div>
      ))}
      <div className="w-max">
        <RippleButton
          btnClass={`text-sm !text-[var(--text-primary-color)] border-[1px] border-[var(--card-border-color)] hover:!text-black cursor-pointer hover:bg-[var(--text-primary-color)] m-2 mx-4 text-black rounded-lg hover:bg-white duration-500 w-full p-2 text-center ${
            value.length < maximunFields && !isEmpty ? "visible" : "hidden"
          }`}
          onClick={handleAddField}
          rippleBackground="rgba(200,200,200,0.8)"
        >
          Add more
        </RippleButton>
      </div>
    </div>
  );
};

export default MultiTextMultiInput;
