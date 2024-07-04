"use client";
import { SwitchInput } from "@/components/formComponents/InputMapper";
import { HorizontalDivider } from "@/components/general/Divider";
import useForm from "@/hooks/useForm";
import { barlow } from "@/lib/Fonts";
import { SECTION_TYPE } from "@/types/mapper.types";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React, { useEffect } from "react";
import { LuWrapText } from "react-icons/lu";
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
  const [value, handleChange] = useForm(initValue, true);

  const groupedByTag = () =>
    settings.inputs.reduce((acc: Record<string, any>, input) => {
      const { tag } = input;
      if (!tag) return acc;
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(input);
      return acc;
    }, {});

  const [tabsContent, setTabContent] = React.useState<Record<string, any>>({});
  const [tabs, setTabs] = React.useState<string[]>([]);
  const [currentTab, setCurrentTab] = React.useState<Set<string>>(
    new Set([""])
  );

  console.log({ tabsContent, tabs, currentTab });

  useEffect(() => {
    const group = groupedByTag();
    setTabContent(group);
    setTabs(Object.keys(group));
    setCurrentTab(new Set([Object.keys(group)[0]]));
  }, [settings]);

  function updateValueInJson() {
    if (useMapper?.webJson) {
      useMapper?.setWebJson?.((prevJson) => {
        const updatedJson = settings.patchJson(prevJson, value);
        return { ...prevJson, ...updatedJson };
      });
    }
  }

  function handleSelectionChange(keys: string | string[] | Set<any>) {
    // Convert the keys to Set<string>
    console.log(keys);
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
      <div className="w-full flex justify-between items-center">
        <h3 className={`text-[var(--text-primary-color)] px-2 text-lg`}>
          {settings.heading}
        </h3>
        <LuWrapText
          className={`mr-4 cursor-pointer text-[var(--text-secondary-color)] hover:text-[var(--text-primary-color)] text-xl duration-100 ${tabs.length > 0 ? "visible" : "hidden"}`}
          onClick={() => collapseAllAccordion()}
        />
      </div>
      <HorizontalDivider />
      <div className=" flex flex-col px-2 w-full">
        <Accordion
          selectionMode="multiple"
          selectedKeys={currentTab}
          onSelectionChange={handleSelectionChange}
        >
          {tabs.map((tab) => {
            return (
              <AccordionItem
                key={tab}
                aria-label={tab}
                title={<div className="w-[100%]">{tab}</div>}
                className="border-b border-[var(--card-border-hover-color)]"
              >
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
