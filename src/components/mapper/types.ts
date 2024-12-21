import { LANDER_TYPE, PRODUCT_TYPE, SECTION_TYPE } from "@/types/mapper.types";
import { ListKey } from "../formComponents/types/input.types";
import { LanderProps } from "./lander/Lander.types";
import { ProductProps } from "./product/Product.types";

export type UpdateConfigFuncs = {
  handleAddProduct: (config: ProductProps, productType: PRODUCT_TYPE) => void;
  handleAddSection: (section: SECTION_TYPE) => void;
  handleUpdateLander: (config: LanderProps, landerType: LANDER_TYPE) => void;
  updateList: (key: ListKey, index: number) => (value: ManagerList[]) => void;
};

export type ManagerList = {
  id: number;
  description: string;
  content: Record<string, any>;
};
