import { ChangeEvent } from "react";
import TextInput from "./components/TextInput";
import { GlobalInputIncomingType, GlobalInputType, InputTypeEnum } from "./types/input.types";
import NumberInput from "./components/NumberInput";
import TextAreaInput from "./components/TextAreaInput";
import ImapeUploader from "./components/ImapeUploader";
import Checkbox from "./components/Checkbox";
import ToggleButton from "./components/ToggleButton";

export const createBaseValue = (fields:any[]) => {
    const initialValue: Record<string, any> = {};
    fields.forEach((sect) => {
      sect.inputs.forEach((inp: any) => {
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
    });
    return initialValue;
  };

export const switchInput = (inp:any, value:Record<string,any>, handleChange:(e: any) => void, key:string) => {
    switch (inp.type) {
        case InputTypeEnum.TEXT_INPUT:
          return (
            <TextInput
              {...{
                ...inp,
                value: value[inp.name],
                onChange: handleChange,
              }}
              key={key}
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
              key={key}
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
              key={key}
            />
          );

        case InputTypeEnum.IMAGE_UPLOADER:
          return (
            <ImapeUploader
              {...{
                ...inp,
                loading: false,
                onChange: handleChange,
                value: value[inp.name],
              }}
              key={key}
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

          case InputTypeEnum.TOGGLE_BUTTON_INPUT:
          return (
            <ToggleButton
              {...{
                ...inp,
                onChange: handleChange,
                value: value[inp.name],
              }}
              key={inp.name}
            />
          );
}
}