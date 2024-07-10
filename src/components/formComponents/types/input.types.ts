import { ChangeEvent } from "react";

export enum InputTypeEnum {
  IMAGE_UPLOADER = "imageUploader",
  TEXT_INPUT = "textInput",
  MULTI_TEXT_INPUT = "multiTextInput",
  MULTI_TEXT_MULTI_INPUT = "multiTextMultiInput",
  NUMBER_INPUT = "numberInput",
  TEXT_AREA_INPUT = "textAreaInput",
  CHECKBOX_INPUT = "checkboxInput",
  TOGGLE_BUTTON_INPUT = "toggleButtonInput",
  COLOR_PICKET_INPUT = "colorPickerInput",
  DROPDOWN_INPUT = "dropdownInput",
}

export type GlobalInputType =
  | ImageFileUploaderType
  | TextInputType
  | MultiTextInputType
  | MultiTextMultiInputType
  | NumberInputType
  | TextAreaInputType
  | CheckboxType
  | ToggleButtonInputType
  | DropdownInputType
  | ColorPickerInputType;

export type GlobalInputIncomingType =
  | ImageFileUploaderIncomingType
  | TextInputIncomingType
  | MultiTextInputIncomingType
  | MultiTextMultiInputIncomingType
  | NumberInputIncomingType
  | TextAreaInputIncomingType
  | CheckboxIncomingType
  | CheckboxIncomingMultiSelectType
  | ToggleButtonIncomingType
  | DropdownInputIncomingType
  | ColorPickerIncomingType;

export type TextInputIncomingType = {
  tag?: string;
  type: InputTypeEnum.TEXT_INPUT;
  name: string;
  placeholder: string;
  preText: string;
  postText: string;
  header: string;
  label: string;
  valueTransformer: (value: string) => string;
  showError: boolean;
  errorTextForRegex: string;
  regexMatch: RegExp | null;
  maxLength?: number;
  required: boolean;
};

export type MultiTextInputIncomingType = {
  tag?: string;
  type: InputTypeEnum.MULTI_TEXT_INPUT;
  name: string;
  placeholder: string;
  preText: string;
  postText: string;
  label: string;
  valueTransformer: (value: string) => string;
  showError: boolean;
  errorTextForRegex: string;
  regexMatch: RegExp | null;
  maxLength?: number;
  required: boolean;
  maximunFields: number;
};

export type MultiTextMultiInputIncomingType = {
  tag?: string;
  type: InputTypeEnum.MULTI_TEXT_MULTI_INPUT;
  name: string;
  label: string;
  required: boolean;
  maximunFields: number;
  structure: TextInputIncomingType[];
};

export type DropdownInputIncomingType = {
  tag?: string;
  type: InputTypeEnum.DROPDOWN_INPUT;
  name: string;
  preText: string;
  postText: string;
  header: string;
  label: string;
  required: boolean;
  multiSelect: boolean;
  options: OptionType[];
};

export type NumberInputIncomingType = {
  tag?: string;
  type: InputTypeEnum.NUMBER_INPUT;
  name: string;
  placeholder: string;
  preText: string;
  postText: string;
  header: string;
  label: string;
  valueTransformer: (value: string) => string;
  showError: boolean;
  errorTextForRegex: string;
  regexMatch: RegExp | null;
  maxLength?: number;
  required: boolean;
};

export type TextInputType = TextInputIncomingType & {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export type MultiTextInputType = MultiTextInputIncomingType & {
  onChange: (e: DummyEvent) => void;
  value: string[];
};

export type MultiTextMultiInputType = MultiTextMultiInputIncomingType & {
  onChange: (e: DummyEvent) => void;
  value: Record<string,any>[];
};

export type DummyEvent = {
  target: {
    name: string;
    type: string;
    value: any;
  };
};

export type DropdownOptionType = {
  value: string;
  label: string;
};

export type DropdownInputType = DropdownInputIncomingType & {
  onChange: (e: DummyEvent) => void;
  value: DropdownOptionType;
};

export type NumberInputType = TextInputIncomingType & {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export type ToggleButtonIncomingType = {
  tag?: string;
  type: InputTypeEnum.TOGGLE_BUTTON_INPUT;
  name: string;
  header: string;
  subHeading?: string;
  flexEnd?: boolean;
};

export type ColorPickerIncomingType = {
  tag?: string;
  type: InputTypeEnum.COLOR_PICKET_INPUT;
  name: string;
  header: string;
  subHeading?: string;
  flexEnd?: boolean;
};

export type TextAreaInputIncomingType = {
  tag?: string;
  type: InputTypeEnum.TEXT_AREA_INPUT;
  name: string;
  placeholder: string;
  header: string;
  label: string;
  valueTransformer: (value: string) => string;
  showError: boolean;
  errorTextForRegex: string;
  regexMatch: RegExp | null;
  maxLength?: number;
  rows?: number;
  required: boolean;
};

export type ToggleButtonInputType = ToggleButtonIncomingType & {
  onChange: (e: DummyEvent) => void;
  value: boolean;
};

export type ColorPickerInputType = ColorPickerIncomingType & {
  onChange: (e: DummyEvent) => void;
  value: string;
};

export type TextAreaInputType = TextAreaInputIncomingType & {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
};
export type ImageFileUploaderIncomingType = {
  name: string;
  error: string;
  tag?: string;
  type: InputTypeEnum.IMAGE_UPLOADER;
  required: boolean;
};

export type ImageFileUploaderType = ImageFileUploaderIncomingType & {
  loading: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: File | null | undefined;
};

export type OptionType = {
  value: string;
  label: string;
};

export type CheckboxBaseIncomingType = {
  tag?: string;
  type: InputTypeEnum.CHECKBOX_INPUT;
  options: OptionType[];
  name: string;
  header: string;
  required: boolean;
};

export type CheckboxIncomingType = CheckboxBaseIncomingType & {
  multiSelect: false;
};
export type CheckboxIncomingMultiSelectType = CheckboxBaseIncomingType & {
  multiSelect: true;
};

export type CheckboxType =
  | (CheckboxIncomingType & {
      onChange: (e: DummyEvent) => void;
      value: string;
    })
  | (CheckboxIncomingMultiSelectType & {
      onChange: (e: DummyEvent) => void;
      value: string[];
    });
