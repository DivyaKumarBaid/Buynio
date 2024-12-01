import { ManagerList, UpdateConfigFuncs } from "@/components/mapper/types";
import { ChangeEvent, ReactNode } from "react";

export enum InputTypeEnum {
  IMAGE_UPLOADER = "imageUploader",
  MULTI_IMAGE_UPLOADER = "multiImageUploader",
  TEXT_INPUT = "textInput",
  MULTI_TEXT_INPUT = "multiTextInput",
  MULTI_TEXT_MULTI_INPUT = "multiTextMultiInput",
  NUMBER_INPUT = "numberInput",
  RANGE_INPUT = "rangeInput",
  TEXT_AREA_INPUT = "textAreaInput",
  CHECKBOX_INPUT = "checkboxInput",
  TOGGLE_BUTTON_INPUT = "toggleButtonInput",
  COLOR_PICKER_INPUT = "colorPickerInput",
  DROPDOWN_INPUT = "dropdownInput",
  LIST_MANAGER = "listManager",
}

export enum ListKey {
  SECTION = "section",
}

export type GlobalInputType =
  | ImageFileUploaderType
  | MultiImageFileUploaderType
  | TextInputType
  | MultiTextInputType
  | MultiTextMultiInputType
  | NumberInputType
  | RangeInputType
  | TextAreaInputType
  | CheckboxType
  | ToggleButtonInputType
  | DropdownInputType
  | ColorPickerInputType
  | ListInputType;

export type GlobalInputIncomingType =
  | ImageFileUploaderIncomingType
  | TextInputIncomingType
  | MultiTextInputIncomingType
  | MultiTextMultiInputIncomingType
  | NumberInputIncomingType
  | RangeInputIncomingType
  | TextAreaInputIncomingType
  | CheckboxIncomingType
  | CheckboxIncomingMultiSelectType
  | ToggleButtonIncomingType
  | DropdownInputIncomingType
  | ColorPickerIncomingType
  | ListInputIncomingType;

export type TextInputIncomingType = {
  tag?: string;
  type: InputTypeEnum.TEXT_INPUT;
  name: string;
  hidden?: boolean;
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
  customIcon?: ReactNode;
};

export type MultiTextInputIncomingType = {
  tag?: string;
  type: InputTypeEnum.MULTI_TEXT_INPUT;
  name: string;
  hidden?: boolean;
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
  hidden?: boolean;
  label: string;
  required: boolean;
  maximunFields: number;
  structure: (
    | TextInputIncomingType
    | ColorPickerIncomingType
    | DropdownInputIncomingType
  )[];
};
export type DropdownInputIncomingType = {
  tag?: string;
  type: InputTypeEnum.DROPDOWN_INPUT;
  name: string;
  hidden?: boolean;
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
  hidden?: boolean;
  placeholder: string;
  preText: string;
  postText: string;
  header: string;
  label: string;
  valueTransformer: (value: string) => string;
  showError: boolean;
  errorTextForRegex: string;
  regexMatch: RegExp | null;
  min?: number;
  max?: number;
  required: boolean;
  customIcon?: ReactNode;
};

export type RangeInputIncomingType = {
  tag?: string;
  type: InputTypeEnum.RANGE_INPUT;
  name: string;
  hidden?: boolean;
  header: string;
  valueTransformer: (value: string) => string;
  min: number;
  max: number;
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
  value: Record<string, any>[];
};

export type DummyEvent = {
  target: {
    name: string;
    hidden?: boolean;
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

export type NumberInputType = NumberInputIncomingType & {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export type RangeInputType = RangeInputIncomingType & {
  onChange: (e: DummyEvent) => void;
  value: string;
};

export type ToggleButtonIncomingType = {
  tag?: string;
  type: InputTypeEnum.TOGGLE_BUTTON_INPUT;
  name: string;
  hidden?: boolean;
  header: string;
  subHeading?: string;
  flexEnd?: boolean;
};

export type ColorPickerIncomingType = {
  tag?: string;
  type: InputTypeEnum.COLOR_PICKER_INPUT;
  name: string;
  hidden?: boolean;
  header: string;
  subHeading?: string;
  flexEnd?: boolean;
};

export type TextAreaInputIncomingType = {
  tag?: string;
  type: InputTypeEnum.TEXT_AREA_INPUT;
  name: string;
  hidden?: boolean;
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
  hidden?: boolean;
  error: string;
  tag?: string;
  type: InputTypeEnum.IMAGE_UPLOADER;
  required: boolean;
};

export type ListInputIncomingType = {
  name: string;
  tag?: string;
  type: InputTypeEnum.LIST_MANAGER;
  key: ListKey;
  hidden?: Boolean;
};

export type MultiImageFileUploaderIncomingType = {
  name: string;
  hidden?: boolean;
  error: string;
  tag?: string;
  type: InputTypeEnum.MULTI_IMAGE_UPLOADER;
  required: boolean;
  maxFiles: number;
};

export type ImageFileUploaderType = ImageFileUploaderIncomingType & {
  loading: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: File | null | undefined;
};

export type ListInputType = ListInputIncomingType & {
  taskList: ManagerList[];
  updateFunction: (list: ManagerList[]) => void;
};

export type MultiImageFileUploaderType = MultiImageFileUploaderIncomingType & {
  loading: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: File[] | null | undefined;
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
  hidden?: boolean;
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
