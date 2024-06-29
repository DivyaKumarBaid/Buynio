"use client";
import {
  SwitchInput
} from "@/components/formComponents/InputMapper";
import { HorizontalDivider } from "@/components/general/Divider";
import useForm from "@/hooks/useForm";
import { barlow } from "@/lib/Fonts";
import { SECTION_TYPE } from "@/types/mapper.types";
import { useEffect } from "react";
import { useMapperContext } from "../hooks/selectedElemContext";
import { SettingsMapperSubType } from "./Settings.type";

const SettingsMapper = ({
  initValue,
  settings,
}: {
  initValue: Record<string, any>;
  settings: SettingsMapperSubType;
}) => {
  const useMapper = useMapperContext();
  const [value, handleChange] = useForm(initValue);

  function updateValueInJson() {
    if (useMapper?.webJson) {
      useMapper?.setWebJson?.((prevJson) => {
        const updatedJson = settings.patchJson(prevJson, value);
        return { ...prevJson, ...updatedJson };
      });
    }
  }

  useEffect(() => {
    updateValueInJson();
  }, [value]);

  return (
    <div className={`${barlow.className} min-w-[300px] flex flex-col items-start gap-2 tracking-wider`}>
      <h3 className={`text-[var(--text-primary-color)] px-2 text-lg`}> {settings.heading} </h3>
      <HorizontalDivider />
      {settings.inputs.map((input, index) => {
        return (
          <SwitchInput
            input={input}
            inputKey={
              (useMapper?.selectedElement?.type || SECTION_TYPE.GENERAL) + index
            }
            handleChange={handleChange}
            value={value}
            key={`setting${index}`}
          />
        );
      })}
    </div>
  );
};

export default SettingsMapper;
