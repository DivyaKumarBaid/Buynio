import React from "react";
import { CardLayout, HeadingLayout, ProductLayout } from "./StyledComponents";
import { ProductProps } from "./Product.types";
import { SECTION_TYPE } from "@/types/mapper.types";

const Product_V1 = (props: ProductProps): JSX.Element => {
  console.log(props);
  return (
    <ProductLayout
      $textColor={props.config.textColor}
      className="w-full min-h-[80vh] flex flex-col gap-4 py-6 px-8"
      onClick={(e) => {
        if (props.isSelectMode && props.setSelectedElement) {
          e.stopPropagation();
          props.setSelectedElement({
            type: SECTION_TYPE.PRODUCT,
            subType: props.subType,
          });
        }
      }}
    >
      <HeadingLayout
        $textColor={props.config.headingColor}
        $gravity={props.config.headingPlacement}
        $fontSize={props.config.headingSize}
      >
        {props.config.headingText}
      </HeadingLayout>
      <HeadingLayout
        $textColor={props.config.subHeadingColor}
        $gravity={props.config.subHeadingPlacement}
        $fontSize={props.config.subHeadingSize}
      >
        {props.config.subHeadingText}
      </HeadingLayout>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"> 
        {props.config.products?.map((product,index)=>{
          return(
            <CardLayout $background={product.background} className="border-[1px] border-[var(--card-border-color)] rounded-md hover:border-[var(--card-focus-color)] duration-200 flex flex-col text-[var(--text-secondary-color)] hover:text-[var(--text-primary-color)] p-4 gap-2 cursor-pointer h-[50vh]" key={`${product.title}-${index}`}>
              test
            </CardLayout>
          )
        })}
      </div>
    </ProductLayout>
  );
};

export default Product_V1;
