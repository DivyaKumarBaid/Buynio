"use client";
import { SwitchInput } from "@/components/formComponents/InputMapper";
import { HorizontalDivider } from "@/components/general/Divider";
import useForm from "@/hooks/useForm";
import { barlow } from "@/lib/Fonts";
import { SECTION_TYPE } from "@/types/mapper.types";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React, { useEffect } from "react";
import { LuWrapText } from "react-icons/lu";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useMapperContext } from "../hooks/useEditor";
import { SettingsMapperSubType } from "./Settings.type";

const SettingsMapper = ({
  initValue,
  settings,
}: {
  initValue: Record<string, any>;
  settings: SettingsMapperSubType;
  sectionIndex?: number;
}) => {
  const useMapper = useMapperContext();
  const [value, handleChange] = useForm(initValue, true);
  const itemClasses = {
    trigger: "py-4 px-1",
    content: "py-0 pb-2",
  };

  const groupedByTag = () => {
    const visibleSettings = settings.inputs.filter(inp => !inp.hidden)
    return visibleSettings.reduce((acc: Record<string, any>, input) => {
      const { tag } = input;
      if (!tag) return acc;
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(input);
      return acc;
    }, {});
  };

  const [tabsContent, setTabContent] = React.useState<Record<string, any>>({});
  const [tabs, setTabs] = React.useState<string[]>([]);
  const [currentTab, setCurrentTab] = React.useState<Set<string>>(
    new Set([""])
  );

  useEffect(() => {
    const group = groupedByTag();
    setTabContent(group);
    setTabs(Object.keys(group));
    setCurrentTab(new Set(Object.keys(group)));
  }, [settings]);

  function updateValueInJson() {
    if (useMapper?.webJson) {
      useMapper?.setWebJson?.((prevJson) => {
        const updatedJson = settings.patchJson(
          prevJson || {},
          value,
          useMapper?.selectedElement?.index
        );
        return { ...prevJson, ...updatedJson };
      });
    }
  }

  function removeComponent() {
    if (useMapper?.webJson) {
      useMapper?.setWebJson?.((prevJson) => {
        const updatedJson = settings.onRemove?.(
          prevJson || {},
          useMapper?.selectedElement?.index
        );
        return { ...prevJson, ...updatedJson };
      });
      useMapper?.setSelectedElement({
        type: SECTION_TYPE.GENERAL,
        subType: SECTION_TYPE.GENERAL,
      });
    }
  }

  function handleSelectionChange(keys: string | string[] | Set<any>) {
    if (typeof keys === "string") {
      setCurrentTab(new Set([keys]));
    } else if (Array.isArray(keys)) {
      setCurrentTab(new Set(keys));
    } else {
      setCurrentTab(keys);
    }
  }

  function collapseAllAccordion() {
    if (currentTab.size) setCurrentTab(new Set());
    else setCurrentTab(new Set(tabs));
  }

  useEffect(() => {
    updateValueInJson();
  }, [value]);

  return (
    <div
      className={`${barlow.className} flex flex-col items-start gap-2 tracking-wider`}
    >
      {tabs.length > 0 ? <div className="w-full flex justify-between items-center">
        <h3 className={`text-[var(--text-primary-color)] px-2 text-lg`}>
          {settings.heading}
        </h3>
        <div className="flex gap-4 items-center">
          {/* -- todo: add modal */}
          {settings.onRemove && (
            <MdOutlineDeleteSweep
              className="cursor-pointer text-[var(--danger-secondary-color)] text-2xl"
              onClick={() => removeComponent()}
            />
          )}
          <LuWrapText
            className={`mr-4 cursor-pointer text-[var(--text-secondary-color)] hover:text-[var(--text-primary-color)] text-xl duration-100 ${tabs.length > 0 ? "visible" : "hidden"}`}
            onClick={() => collapseAllAccordion()}
          />
        </div>
      </div> : null}
      <div className="flex flex-col w-full">
        <Accordion
          selectionMode="multiple"
          selectedKeys={currentTab}
          onSelectionChange={handleSelectionChange}
          itemClasses={itemClasses}
        >
          {tabs.map((tab) => {
            return (
              <AccordionItem
                key={tab}
                aria-label={tab}
                title={<div className="w-[100%] mx-2">{tab}</div>}
                className="border-[1px] px-2 border-[var(--card-border-hover-color)] bg-[rgba(255,255,255,0.1)] backdrop-blur-xl my-2 rounded-2xl"
              >
                <HorizontalDivider/>
                <div className="flex flex-col gap-2">
                  {tabsContent[tab].map(
                    (input: Record<string, any>, index: number) => {
                      return (
                        <SwitchInput
                          input={input}
                          inputKey={
                            (useMapper?.selectedElement?.type ||
                              SECTION_TYPE.GENERAL) + index
                          }
                          handleChange={handleChange}
                          value={value}
                          key={`setting${index}`}
                        />
                      );
                    }
                  )}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default SettingsMapper;
