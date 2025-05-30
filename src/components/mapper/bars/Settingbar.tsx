"use client";
import React, { useEffect } from "react";
import SettingsMapper from "../settings/Settings.mapper";
import { useMapperContext } from "../hooks/useEditor";
import {
  settingsMapper,
  SettingsMapperSubType,
} from "../settings/Settings.type";
import { SECTION_TYPE } from "@/types/mapper.types";
import { createBaseValue } from "@/components/formComponents/InputMapper";
import { UpdateConfigFuncs } from "../types";

const Settingbar = ({
  updateFunctions,
}: {
  updateFunctions: UpdateConfigFuncs;
}) => {
  const useMapper = useMapperContext();
  const [settings, setSettings] = React.useState<SettingsMapperSubType>(
    settingsMapper[useMapper?.selectedElement?.type || SECTION_TYPE.GENERAL][
      useMapper?.selectedElement?.subType || SECTION_TYPE.GENERAL
    ]
  );
  const [initValue, setInitValue] = React.useState(createValue());

  function createValue() {
    const arr =
      settingsMapper[useMapper?.selectedElement?.type || SECTION_TYPE.GENERAL][
        useMapper?.selectedElement?.subType || SECTION_TYPE.GENERAL
      ].inputs;
    const base = createBaseValue(arr);
    const updatedSettings =
      settingsMapper[useMapper?.selectedElement?.type || SECTION_TYPE.GENERAL][
        useMapper?.selectedElement?.subType || SECTION_TYPE.GENERAL
      ];
    let originalValue;
    if (useMapper?.selectedElement?.type)
      originalValue = updatedSettings.getJsonFromKey(
        useMapper?.webJson || {},
        useMapper?.selectedElement?.index || 0
      );
    else
      originalValue = updatedSettings.getJsonFromKey(useMapper?.webJson || {});
    return { ...base, ...originalValue }; //patches base value with one present in webjson
  }

  useEffect(() => {
    setSettings(
      settingsMapper[useMapper?.selectedElement?.type || SECTION_TYPE.GENERAL][
        useMapper?.selectedElement?.subType || SECTION_TYPE.GENERAL
      ]
    );
    const initVal = createValue();
    setInitValue(initVal);
  }, [useMapper?.selectedElement]);

  return (
    <div className="w-max min-w-[380px] h-[100vh] overflow-y-auto overflow-x-clip p-4 px-2 ">
      <SettingsMapper initValue={initValue} settings={settings} updateFunctions={updateFunctions}/>
    </div>
  );
};

export default Settingbar;
