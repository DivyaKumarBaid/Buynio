import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { InputTypeEnum, MultiTextInputType } from "../types/input.types";
import RippleButton from "./Ripple";
import TextInput from "./TextInput";

const MultiInput = ({
  value,
  name,
  onChange,
  placeholder,
  preText,
  postText,
  label,
  valueTransformer,
  showError,
  errorTextForRegex,
  regexMatch,
  maxLength,
  required,
  maximunFields,
}: MultiTextInputType) => {
  const isEmptyValue = () => {
    return value?.some((inp) => {
      inp.trim() === ""
    });
  };

  const [isEmpty, setEmpty] = React.useState<boolean>(isEmptyValue());

  React.useEffect(() => {
    setEmpty(isEmptyValue());
  }, [value]);

  const handleChange = (index: number, val: string) => {
    const newValue = [...value];
    newValue[index] = val;

    const e = {
      target: {
        name,
        type: InputTypeEnum.MULTI_TEXT_INPUT,
        value: newValue,
      },
    };
    onChange(e);
  };

  const handleAddField = () => {
    if (value.length < maximunFields) {
      const newValue = [...value, ""];
      const e = {
        target: {
          name,
          type: InputTypeEnum.MULTI_TEXT_INPUT,
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
        type: InputTypeEnum.MULTI_TEXT_INPUT,
        value: newValue,
      },
    };
    onChange(e);
  };

  return (
    <div className="flex flex-col w-[380px]">
      {label && (
        <div className="text-sm text-[var(--text-secondary-color)] mx-4">
          {label}
          {required && <span className="ml-1 text-red">*</span>}
        </div>
      )}
      {value.map((input, index) => (
        <div
          className="flex items-center relative w-max"
          key={`${name}-${index}`}
        >
          {required && value.length <= 1 ? null : (
            <MdOutlineCancel
              onClick={() => handleRemoveField(index)}
              className="text-xl absolute cursor-pointer top-1 right-2 text-[var(--text-secondary-color)] hover:text-[var(--text-primary-color)]"
            />
          )}
          <TextInput
            type={InputTypeEnum.TEXT_INPUT}
            name={`${name}[${index}]`}
            placeholder={placeholder}
            preText={preText}
            postText={postText}
            header=""
            label=""
            valueTransformer={valueTransformer}
            showError={showError}
            errorTextForRegex={errorTextForRegex}
            regexMatch={regexMatch}
            required={required}
            onChange={(e) => handleChange(index, e.target.value)}
            value={input}
            maxLength={maxLength}
          />
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

export default MultiInput;
