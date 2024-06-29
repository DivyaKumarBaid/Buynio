import Checkbox from "./components/Checkbox";
import ColorPicker from "./components/ColorPicker";
import ImapeUploader from "./components/ImapeUploader";
import NumberInput from "./components/NumberInput";
import TextAreaInput from "./components/TextAreaInput";
import TextInput from "./components/TextInput";
import ToggleButton from "./components/ToggleButton";
import { InputTypeEnum } from "./types/input.types";

export const createBaseValue = (fields: any[]) => {
  const initialValue: Record<string, any> = {};
  fields?.forEach((inp: any) => {
    switch (inp.type) {
      case InputTypeEnum.TEXT_AREA_INPUT:
        initialValue[inp.name] = "";
        break;
      case InputTypeEnum.NUMBER_INPUT:
        initialValue[inp.name] = "";
        break;
      case InputTypeEnum.TEXT_INPUT:
        initialValue[inp.name] = "";
        break;
      case InputTypeEnum.IMAGE_UPLOADER:
        initialValue[inp.name] = null;
        break;
      case InputTypeEnum.CHECKBOX_INPUT:
        initialValue[inp.name] = inp.multiSelect ? [] : "";
        break;
    }
  });
  return initialValue;
};

export const SwitchInput = ({
  input,
  value,
  handleChange,
  inputKey,
}: {
  input: any;
  value: Record<string, any>;
  handleChange: (e: any) => void;
  inputKey: string;
}) => {
  switch (input.type) {
    case InputTypeEnum.COLOR_PICKET_INPUT:
      return (
        <ColorPicker
          {...{
            ...input,
            value: value[input.name],
            onChange: handleChange,
          }}
          key={inputKey}
        />
      );
    case InputTypeEnum.TEXT_INPUT:
      return (
        <TextInput
          {...{
            ...input,
            value: value[input.name],
            onChange: handleChange,
          }}
          key={inputKey}
        />
      );
    case InputTypeEnum.NUMBER_INPUT:
      return (
        <NumberInput
          {...{
            ...input,
            value: value[input.name],
            onChange: handleChange,
          }}
          key={inputKey}
        />
      );
    case InputTypeEnum.TEXT_AREA_INPUT:
      return (
        <TextAreaInput
          {...{
            ...input,
            value: value[input.name],
            onChange: handleChange,
          }}
          key={inputKey}
        />
      );

    case InputTypeEnum.IMAGE_UPLOADER:
      return (
        <ImapeUploader
          {...{
            ...input,
            loading: false,
            onChange: handleChange,
            value: value[input.name],
          }}
          key={inputKey}
        />
      );

    case InputTypeEnum.CHECKBOX_INPUT:
      return (
        <Checkbox
          {...{
            ...input,
            onChange: handleChange,
            value: value[input.name],
          }}
          key={input.name}
        />
      );

    case InputTypeEnum.TOGGLE_BUTTON_INPUT:
      return (
        <ToggleButton
          {...{
            ...input,
            onChange: handleChange,
            value: value[input.name],
          }}
          key={input.name}
        />
      );
  }
};
