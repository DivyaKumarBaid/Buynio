import { addSectionOptions, sectionNameMapper } from "@/lib/constants";
import { barlow } from "@/lib/Fonts";
import { SECTION_TYPE } from "@/types/mapper.types";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { CiSquarePlus } from "react-icons/ci";

const AddSection = ({
  handleAddSection,
}: {
  handleAddSection: (section: SECTION_TYPE) => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        className={`${barlow.className} opacity-75 hover:opacity-100 flex flex-col border-2 border-[var(--card-border-color)] rounded-lg justify-center duration-300 items-center m-8 h-[70vh] cursor-pointer bg-[url('/editorBg.png')] bg-cover bg-no-repeat`}
        onClick={onOpen}
      >
        <CiSquarePlus className=" text-[100px] opacity-50 group-hover:opacity-100" />
        <h1 className="opacity-50 group-hover:opacity-100">
          Add a new section
        </h1>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent className="bg-[var(--card-bg-color)] rounded-md shadow-[0px_0px_16px_rgba(0,0,0,0.2)] border border-[var(--card-border-color)]">
          {(onClose) => (
            <>
              <ModalHeader
                className={`flex flex-col gap-2 border-b-[1px] mb-2 border-[var(--card-border-color)]`}
              >
                <h1
                  className={`${barlow.className} !text-[var(--text-secondary-color)] tracking-widest`}
                >
                  Select a new section you want to add.
                </h1>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {addSectionOptions.map((section, index) => {
                    return (
                      <div
                        className="border-[1px] border-[var(--card-border-color)] rounded-md hover:border-[var(--card-focus-color)] duration-200 flex flex-col text-[var(--text-secondary-color)] hover:text-[var(--text-primary-color)] break-keep p-2 gap-1 cursor-pointer text-center"
                        key={`${section.name}-${index}`}
                        onClick={() => {
                          handleAddSection(section.name);
                          onClose();
                        }}
                      >
                        <h6>{sectionNameMapper[section.name]}</h6>
                        <p className="text-xs opacity-50">{section.description}</p>
                      </div>
                    );
                  })}
                </div>
              </ModalBody>

              <ModalFooter className="w-full flex justify-end">
                <div
                  className="border-[1px] text-sm border-[var(--card-border-color)] text-[var(--text-secondary-color)] hover:text-[var(--text-primary-color)] hover:border-[var(--card-border-hover-color)] duration-200 rounded-md p-2 cursor-pointer"
                  onClick={onClose}
                >
                  Cancel
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSection;
