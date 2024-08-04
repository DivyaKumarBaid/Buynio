import { PRODUCT_TYPE, SECTION_TYPE } from "@/types/mapper.types";
import { SelectedElem } from "../hooks/selectedElemContext";

export type ProductProps = {
  type: SECTION_TYPE.PRODUCT;
  subType: PRODUCT_TYPE;
  config: {
    headingText: string;
    headingColor: string;
    headingPlacement: string;
    headingSize: string;
    subHeadingText: string;
    subHeadingColor: string;
    subHeadingPlacement: string;
    subHeadingSize: string;
    background: string;
    products: ProductsObject[];
    cardColor: string;
    textColor: string;
    showPrice: string;
  };
  isSelectMode?: boolean;
  setSelectedElement?: React.Dispatch<
    React.SetStateAction<SelectedElem | null>
  >;
  selected?: boolean;
};

export type ProductsObject = {
  title: string;
  description: string;
  price: string;
  redirection: string; //link
  src: string[]; //image
  background: string;
};
