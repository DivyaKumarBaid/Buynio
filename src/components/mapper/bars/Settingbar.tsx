"use client";
import React, { useEffect } from "react";
import SettingsMapper from "../settings/Settings.mapper";
import { useMapperContext } from "../hooks/selectedElemContext";
import {
  settingsMapper,
  SettingsMapperSubType,
} from "../settings/Settings.type";
import { SECTION_TYPE } from "@/types/mapper.types";
import { createBaseValue } from "@/components/formComponents/InputMapper";

const Settingbar = () => {
  const useMapper = useMapperContext();
  const [settings, setSettings] = React.useState<SettingsMapperSubType>(
    settingsMapper[useMapper?.selectedElement?.type || SECTION_TYPE.GENERAL][
      useMapper?.selectedElement?.subType || SECTION_TYPE.GENERAL
    ]
  );
  const [initValue, setInitValue] = React.useState(createValue());

  function createValue() {
    const base = createBaseValue(
      settingsMapper[useMapper?.selectedElement?.type || SECTION_TYPE.GENERAL][
        useMapper?.selectedElement?.subType || SECTION_TYPE.GENERAL
      ].input
    );
    const updatedSettings =
      settingsMapper[useMapper?.selectedElement?.type || SECTION_TYPE.GENERAL][
        useMapper?.selectedElement?.subType || SECTION_TYPE.GENERAL
      ];
    let originalValue;
    if (useMapper?.selectedElement?.type)
      originalValue = updatedSettings.getJsonFromKey(
        useMapper?.webJson || {},
        0
      );
    else
      originalValue = updatedSettings.getJsonFromKey(useMapper?.webJson || {});
    return { ...base, ...originalValue };
  }

  useEffect(() => {
    setSettings(
      settingsMapper[useMapper?.selectedElement?.type || SECTION_TYPE.GENERAL][
        useMapper?.selectedElement?.subType || SECTION_TYPE.GENERAL
      ]
    );
    setInitValue(createValue());
  }, [useMapper?.selectedElement]);

  return (
    <div className="w-max bg-[var(--card-bg-color)] border-l-[1px] border-l-[var(--card-border-color)] shadow-[-3px_-3px_16px_rgba(0,0,0,0.3)] h-[100vh] p-4 px-2">
      <SettingsMapper initValue={initValue} settings={settings} />
    </div>
  );
};

export default Settingbar;
