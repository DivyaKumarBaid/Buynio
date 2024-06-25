import React from "react";
import { useMapperContext, View } from "../hooks/selectedElemContext";
import ToggleButton from "@/components/formComponents/components/ToggleButton";
import { InputTypeEnum } from "@/components/formComponents/types/input.types";
import VerticalDivider from "@/components/general/VerticalDivider";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";

const Topbar = () => {
  const useMapper = useMapperContext();
  return (
    <div className="p-2 px-4 fixed z-[101] bg-[rgba(36,36,36)] shadow-xl top-8 rounded-xl flex items-center justify-center gap-2">
      <ToggleButton
        value={useMapper?.view === View.WEB ? true : false}
        header={"Toggle View"}
        name={"WEB"}
        type={InputTypeEnum.TOGGLE_BUTTON_INPUT}
        onChange={(e) =>
          useMapper?.setView(e.target.value === true ? View.WEB : View.MOBILE)
        }
      />
      <VerticalDivider
        width="1px"
        height="20px"
        backgroundColor="rgba(150,150,150)"
      />
      <div className="flex flex-col mx-2 justify-center gap-1 items-center">
        <div className="text-[var(--text-primary-color)] text-sm">
          {useMapper?.selectedElement?.type || "General"}
        </div>
      </div>
      {useMapper?.roomId && (
        <>
          <VerticalDivider
            width="1px"
            height="20px"
            backgroundColor="rgba(150,150,150)"
          />
          <Link href={`/mapper/simulator/${useMapper?.roomId}`} target="_blank">
            <FaLink className="text-[var(--text-secondary-color)] hover:text-[var(--text-primary-color)] duration-200 cursor-pointer text-xl mx-2" />
          </Link>
        </>
      )}
    </div>
  );
};

export default Topbar;
