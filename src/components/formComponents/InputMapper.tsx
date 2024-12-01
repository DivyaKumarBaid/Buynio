import { getList } from "@/utils/utility";
import TaskManager from "../general/TaskManager";
import { ManagerList, UpdateConfigFuncs } from "../mapper/types";
import Checkbox from "./components/Checkbox";
import ColorPicker from "./components/ColorPicker";
import Dropdown from "./components/Dropdown";
import ImageUploader from "./components/ImageUploader";
import MultiInput from "./components/MultiInput";
import MultiTextMultiInput from "./components/MultiTextMultiInput";
import NumberInput from "./components/NumberInput";
import Range from "./components/Slider";
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
        initialValue[inp.name] = "0";
        break;
      case InputTypeEnum.TEXT_INPUT:
        initialValue[inp.name] = "";
        break;
      case InputTypeEnum.MULTI_TEXT_INPUT:
        initialValue[inp.name] = [""];
        break;
      case InputTypeEnum.MULTI_TEXT_MULTI_INPUT:
        initialValue[inp.name] = [createBaseValue(inp.structure)];
        break;
      case InputTypeEnum.COLOR_PICKER_INPUT:
        initialValue[inp.name] = "#000";
        break;
      case InputTypeEnum.RANGE_INPUT:
        initialValue[inp.name] = "0";
        break;
      case InputTypeEnum.DROPDOWN_INPUT:
        initialValue[inp.name] = inp.options[0] || "";
        break;
      case InputTypeEnum.IMAGE_UPLOADER:
        initialValue[inp.name] = null;
        break;
      case InputTypeEnum.MULTI_IMAGE_UPLOADER:
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
  updateFunctions,
  webJson,
}: {
  input: any;
  value: Record<string, any>;
  handleChange: (e: any) => void;
  inputKey: string;
  updateFunctions?: UpdateConfigFuncs;
  webJson?: Record<string, any> | null | undefined;
}) => {
  console.log(input);
  if(webJson == null) return null;
  switch (input.type) {
    case InputTypeEnum.COLOR_PICKER_INPUT:
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
    case InputTypeEnum.RANGE_INPUT:
      return (
        <Range
          {...{
            ...input,
            value: value[input.name],
            onChange: handleChange,
          }}
          key={inputKey}
        />
      );
    case InputTypeEnum.DROPDOWN_INPUT:
      return (
        <Dropdown
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
    case InputTypeEnum.MULTI_TEXT_INPUT:
      return (
        <MultiInput
          {...{
            ...input,
            value: value[input.name],
            onChange: handleChange,
          }}
          key={inputKey}
        />
      );
    case InputTypeEnum.MULTI_TEXT_MULTI_INPUT:
      return (
        <MultiTextMultiInput
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
        <ImageUploader
          {...{
            ...input,
            loading: false,
            onChange: handleChange,
            value: value[input.name],
          }}
          key={inputKey}
        />
      );

    case InputTypeEnum.LIST_MANAGER:
      return (
        <TaskManager
          taskList={getList(input.key, webJson)}
          updateFunction={
            updateFunctions
              ? updateFunctions.handleUpdateSectionList
              : () => null
          }
        />
      );

    case InputTypeEnum.MULTI_IMAGE_UPLOADER:
      return (
        <ImageUploader
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
