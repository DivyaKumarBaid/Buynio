import { NAV_TYPE } from "@/types/mapper.types";
import { SelectedElem } from "../hooks/selectedElemContext";

export type NavbarProps = {
    type: NAV_TYPE
    background: string;
    headerFontColor: string;
    linkFontColor: string;
    isSticky: boolean;
    links: {link: string, redirection: string}[];
    brandName: string;
    logo: string;
    logoSize: number;
    logoVisibility: boolean;
    headerVisibility: boolean;
    isSelectMode?: boolean;
    setSelectedElement?: React.Dispatch<React.SetStateAction<SelectedElem | null>>;
    selected?: boolean
  };