import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import React from "react";

const Base = ({
  parent,
  content,
}: {
  parent: JSX.Element;
  content: (onClose: () => void) => JSX.Element;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        {parent}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className="max-w-[80vw] w-max">
        <ModalContent className="bg-[var(--card-bg-color)] rounded-md shadow-[0px_0px_16px_rgba(0,0,0,0.2)] border border-[var(--card-border-color)]">
          {content}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Base;
