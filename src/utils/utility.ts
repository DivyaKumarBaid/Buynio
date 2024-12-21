import { ListKey } from "@/components/formComponents/types/input.types";
import { SelectedElem } from "@/components/mapper/hooks/useEditor";
import { LanderProps } from "@/components/mapper/lander/Lander.types";
import {
  ProductProps,
  ProductsObject,
} from "@/components/mapper/product/Product.types";
import { landerTypeSettings } from "@/components/mapper/settings/Lander";
import { productTypeSettings } from "@/components/mapper/settings/Product";
import { getDefaultSectionConfig } from "@/components/mapper/settings/settingUtils";
import { ManagerList, UpdateConfigFuncs } from "@/components/mapper/types";
import { handleUploadProductImage } from "@/service/hop";
import {
  JSONHeaders,
  LANDER_TYPE,
  PRODUCT_TYPE,
  SECTION_TYPE,
} from "@/types/mapper.types";

export const spy = (statement: string, value: any) => {
  console.log({ [`DEBUG_LOG ${statement}`]: value });
  return value;
};

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export const extractSectionConfig = (
  sectionType: SECTION_TYPE,
  json: Record<string, any>
): Record<string, any>[] => {
  const configs = json[JSONHeaders.SECTIONS].filter(
    (section: Record<string, any>) => section.type == sectionType
  );
  return configs;
};

export const getAllProducts = (json: Record<string, any>) => {
  console.log("DEBUG_LOG getAllProds", json[JSONHeaders.SECTIONS]);
  const accProductProps = json[JSONHeaders.SECTIONS].filter(
    (section: Record<string, any>) => {
      return section.type == SECTION_TYPE.PRODUCT;
    }
  );

  // console.log()
  return getProducts(accProductProps);
};

export const getProducts = (configs: ProductProps[]): ProductsObject[] => {
  console.log("DEBUG_LOG configs", configs);
  const allProds = configs.reduce<ProductsObject[]>((acc, product) => {
    console.log("DEBUG_LOG getProducts", { acc });
    return [...acc, ...product.config.products];
  }, []);
  return allProds;
};

export const patchAllProductImage = async (
  json: Record<string, any>
): Promise<Record<string, any>> => {
  const config: Promise<Record<string, any>>[] = json[JSONHeaders.SECTIONS].map(
    async (section: Record<string, any>) => {
      if (section.type == SECTION_TYPE.PRODUCT) {
        return patchProductImage(
          section as ProductProps,
          json[JSONHeaders.GENERAL].brandName
        );
      }
      return Promise.resolve(section);
    }
  );
  const y = await Promise.all(config);
  json[JSONHeaders.SECTIONS] = y;
  return json;
};

export const patchProductImage = async (
  config: ProductProps,
  brandName: string
): Promise<ProductProps> => {
  const products = config.config.products;
  const patchedProdPromise = products.map(async (prod) => {
    const urls =
      typeof prod.src == "string"
        ? prod.src
        : await handleUploadProductImage(
            new File([prod.src], prod.title),
            brandName
          );
    prod.src = urls;
    return prod;
  });
  const patchedProducts = await Promise.all(patchedProdPromise);
  config.config.products = patchedProducts;
  return config;
};

export const patchAllLanderImage = async (
  json: Record<string, any>
): Promise<Record<string, any>> => {
  const config: Promise<Record<string, any>>[] = json[JSONHeaders.SECTIONS].map(
    async (section: Record<string, any>) => {
      if (section.type == SECTION_TYPE.LANDER) {
        return patchLanderImage(
          section as LanderProps,
          json[JSONHeaders.GENERAL].brandName
        );
      }
      return Promise.resolve(section);
    }
  );
  const y = await Promise.all(config);
  json[JSONHeaders.SECTIONS] = y;
  return json;
};

export const patchLanderImage = async (
  config: LanderProps,
  brandName: string
): Promise<LanderProps> => {
  const products = config.config;
  const urls =
    typeof products.src == "string"
      ? products.src
      : await handleUploadProductImage(
          new File([products.src], `${brandName}${Math.random()}`),
          brandName
        );
  config.config.src = urls;
  return config;
};

export const dummyUpdateConfigFuncs = (): UpdateConfigFuncs => {
  return {
    handleAddProduct: (_: ProductProps, __: PRODUCT_TYPE) => null,
    handleAddSection: (_: SECTION_TYPE) => null,
    handleUpdateLander: (_: LanderProps, __: LANDER_TYPE) => null,
    updateList: (_: ListKey, __: number) => (_: ManagerList[]) => null,
  };
};

export const updateFuncProxy = (
  webJson: Record<string, any> | null | undefined,
  updateJson: (newJson: Record<string, any>) => void,
  selectedElem: SelectedElem | null | undefined
): UpdateConfigFuncs => {
  // update functions passed on
  const handleAddSection = (section: SECTION_TYPE) => {
    if (webJson == null) return;
    const defaultSectionConfig = getDefaultSectionConfig[section];
    const updatedJson = {
      ...webJson,
      [JSONHeaders.SECTIONS]: [
        ...(webJson[JSONHeaders.SECTIONS] || []),
        defaultSectionConfig,
      ],
    };
    updateJson(updatedJson);
  };

  const handleAddProduct = (
    config: Record<string, any>,
    productType: PRODUCT_TYPE
  ) => {
    if (webJson == null) return;
    const updatedJson = productTypeSettings[productType].patchJson(
      webJson || {},
      config.config,
      selectedElem?.index || 0
    );
    updateJson(updatedJson);
  };

  const handleUpdateLander = (config: LanderProps, landerType: LANDER_TYPE) => {
    if (webJson == null) return;
    const updatedJson = landerTypeSettings[landerType].patchJson(
      webJson || {},
      config.config,
      selectedElem?.index || 0
    );
    updateJson(updatedJson);
  };

  // list updater

  const handleUpdateSectionList = (value: ManagerList[]) => {
    if (webJson == null) return;
    webJson[JSONHeaders.SECTIONS] = flattenList(value);
    updateJson(webJson);
  };

  const handleUpdateProductList = (value: ManagerList[], index: number) => {
    if (webJson == null) return;
    const productConfig = productTypeSettings[
      PRODUCT_TYPE.PRODUCT_V1
    ].getJsonFromKey(webJson, index);
    productConfig.products = flattenList(value);
    const updatedJson = productTypeSettings[PRODUCT_TYPE.PRODUCT_V1].patchJson(
      webJson || {},
      productConfig,
      selectedElem?.index || 0
    );
    updateJson(updatedJson);
  };

  const updateList = (key: ListKey, index: number) => {
    switch (key) {
      case ListKey.PRODUCT:
        return (value: ManagerList[]) => handleUpdateProductList(value, index);
      case ListKey.SECTION:
        return (value: ManagerList[]) => handleUpdateSectionList(value);
      default:
        return () => null;
    }
  };

  // list updater

  return {
    handleAddProduct,
    handleAddSection,
    handleUpdateLander,
    updateList,
  };
};

const createSectionList = (webJson: Record<string, any>): ManagerList[] => {
  if (webJson == null) return [];
  return webJson[JSONHeaders.SECTIONS]?.map(
    (section: Record<string, any>, index: number) => {
      return {
        id: index,
        description: section.type,
        content: section,
      };
    }
  );
};

const createProductList = (
  webJson: Record<string, any>,
  index: number
): ManagerList[] => {
  const productConfig = productTypeSettings[
    PRODUCT_TYPE.PRODUCT_V1
  ].getJsonFromKey(webJson, index);
  return productConfig.products?.map(
    (section: Record<string, any>, index: number) => {
      return {
        id: index,
        description: section.title,
        content: section,
      };
    }
  );
};

const flattenList = (value: ManagerList[]): Record<string, any>[] => {
  if (value == null) return [];
  return value.map((section: Record<string, any>) => {
    return section.content;
  });
};

export const getList = (
  key: ListKey,
  webJson: Record<string, any>,
  index: number
): ManagerList[] => {
  switch (key) {
    case ListKey.SECTION:
      return createSectionList(webJson);
    case ListKey.PRODUCT:
      return createProductList(webJson, index);
    default:
      return [];
  }
};
