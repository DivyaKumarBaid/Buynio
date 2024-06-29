import { ChangeEvent } from "react";

export enum InputTypeEnum {
  IMAGE_UPLOADER = "imageUploader",
  TEXT_INPUT = "textInput",
  NUMBER_INPUT = "numberInput",
  TEXT_AREA_INPUT = "textAreaInput",
  CHECKBOX_INPUT = "checkboxInput",
  TOGGLE_BUTTON_INPUT = "toggleButtonInput",
  COLOR_PICKET_INPUT = "colorPickerInput"
}

export type GlobalInputType = ImageFileUploaderType | TextInputType | NumberInputType | TextAreaInputType | CheckboxType | ToggleButtonInputType | ColorPickerInputType;
export type GlobalInputIncomingType = ImageFileUploaderIncomingType | TextInputIncomingType | NumberInputIncomingType | TextAreaInputIncomingType | CheckboxIncomingType | CheckboxIncomingMultiSelectType | ToggleButtonIncomingType | ColorPickerIncomingType;

export type TextInputIncomingType = {
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

export type NumberInputIncomingType = {
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

export type NumberInputType = TextInputIncomingType & {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export type ToggleButtonIncomingType = {
  type: InputTypeEnum.TOGGLE_BUTTON_INPUT;
  name: string;
  header: string;
  subHeading?: string;
  flexEnd?: boolean;
}

export type ColorPickerIncomingType = {
  type: InputTypeEnum.COLOR_PICKET_INPUT;
  name: string;
  header: string;
  subHeading?: string;
  flexEnd?: boolean;
}

export type TextAreaInputIncomingType = {
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
  onChange: (e: any)  => void;
  value: boolean;
}

export type ColorPickerInputType = ColorPickerIncomingType & {
  onChange: (e: any)  => void;
  value: string
}

export type TextAreaInputType = TextAreaInputIncomingType & {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
};
export type ImageFileUploaderIncomingType = {
  name: string;
  error: string;
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
  type: InputTypeEnum.CHECKBOX_INPUT;
  options: OptionType[];
  name: string;
  header: string;
  required: boolean;
}

export type CheckboxIncomingType = CheckboxBaseIncomingType & {
  multiSelect: false;
};
export type CheckboxIncomingMultiSelectType = CheckboxBaseIncomingType & {
  multiSelect: true;
};

export type CheckboxType =
  | (CheckboxIncomingType & {
      onChange: (e: any) => void;
      value: string;
    })
  | (CheckboxIncomingMultiSelectType & {
      onChange: (e: any) => void;
      value: string[];
    });
