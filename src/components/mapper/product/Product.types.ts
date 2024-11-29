import { PRODUCT_TYPE, SECTION_TYPE } from "@/types/mapper.types";
import { SelectedElem } from "../hooks/useEditor";
import { UpdateConfigFuncs } from "../types";

export type ProductConfig = {
  headingText: string;
  headingColor: string;
  headingPlacement: string;
  headingSize: string;
  subHeadingText: string;
  subHeadingColor: string;
  subHeadingPlacement: string;
  subHeadingSize: string;
  cornerRadiusBottomLeft: string;
  cornerRadiusBottomRight: string;
  cornerRadiusTopRight: string;
  cornerRadiusTopLeft: string;
  background: string;
  products: ProductsObject[];
  cardColor: string;
  textColor: string;
  showPrice: string;
};

export type ProductProps = {
  type: SECTION_TYPE.PRODUCT;
  subType: PRODUCT_TYPE;
  config: ProductConfig;
  isSelectMode?: boolean;
  setSelectedElement?: React.Dispatch<
    React.SetStateAction<SelectedElem | null>
  >;
  changeConfig?: (config:ProductConfig) => void
  selected?: boolean;
  updateFunc?: UpdateConfigFuncs;
};

export type ProductsObject = {
  title: string;
  description: string;
  price: string;
  redirection: string; //link
  src: string | File; //image
  background: string;
};
