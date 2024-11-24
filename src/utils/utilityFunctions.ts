import {
  ProductProps,
  ProductsObject,
} from "@/components/mapper/product/Product.types";
import { handleUploadProductImage } from "@/service/hop";
import { JSONHeaders, SECTION_TYPE } from "@/types/mapper.types";

export const spy = (statement: string, value: any) => {
  console.log({ [statement]: value });
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

export const getAllProducts = (configs: ProductProps[]): ProductsObject[] => {
  const allProds = configs.reduce<ProductsObject[]>(
    (acc, product) => [...acc, ...product.config.products],
    []
  );
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
