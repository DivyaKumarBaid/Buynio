import { PRODUCT_TYPE, SECTION_TYPE } from "@/types/mapper.types";
import { ProductProps } from "./product/Product.types";

export type UpdateConfigFuncs = {
  handleAddProduct: (config: ProductProps, productType: PRODUCT_TYPE) => void;
  handleAddSection: (section: SECTION_TYPE) => void;
};
