import RippleButton from "@/components/formComponents/components/Ripple";
import { SECTION_TYPE } from "@/types/mapper.types";
import Link from "next/link";
import { CiSquarePlus } from "react-icons/ci";
import Base from "../modal/Modal";
import { ProductConfig, ProductProps } from "./Product.types";
import {
  CardLayout,
  HeadingLayout,
  ProductLayout,
  TranslucentLayout,
} from "./StyledComponents";
import { addProduct } from "./utils";

const Product_V1 = (props: ProductProps): JSX.Element => {
  // const [liked, setLike] = useState<boolean>(false);

  // const toggleLike = () => setLike((prev) => !prev);

  return (
    <ProductLayout
      $textColor={props.config.textColor}
      className="w-full min-h-[80vh] flex flex-col gap-4 py-6 px-8 overflow-hidden"
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

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 md:p-0 p-2">
        {props.config.products?.map((product, index) => (
          <RippleButton
            onDoubleClick={true}
            onClick={() => null}
            rippleBackground={"rgba(0,0,0,0)"}
            key={`${product.title}-${index}`}
          >
            <CardLayout
              $background={product.background}
              $backgroundImage={product.src[0]}
              $cornerRadiusBottomLeft={props.config.cornerRadiusBottomLeft}
              $cornerRadiusBottomRight={props.config.cornerRadiusBottomRight}
              $cornerRadiusTopRight={props.config.cornerRadiusTopRight}
              $cornerRadiusTopLeft={props.config.cornerRadiusTopLeft}
              className="border-[1px] border-[var(--card-border-color)] duration-200 flex flex-col text-[var(--text-secondary-color)] py-4 px-2 gap-2 cursor-pointer h-[45vh] md:h-[40vh] relative group overflow-hidden"
            >
              <TranslucentLayout
                $cornerRadiusBottomLeft={props.config.cornerRadiusBottomLeft}
                $cornerRadiusBottomRight={props.config.cornerRadiusBottomRight}
                $cornerRadiusTopRight={props.config.cornerRadiusTopRight}
                $cornerRadiusTopLeft={props.config.cornerRadiusTopLeft}
                className={`duration-500 absolute bottom-0 backdrop-blur-lg h-[16vh] w-full bg-[rgba(255,255,255,0.2)] left-0 border-[var(--card-focus-color)] shadow-[2px_2px_12px_rgba(0,0,0,0.6)] p-4 ${false ? "group-hover:translate-y-[18vh]" : ""}`}
              >
                <div
                  className="flex flex-col justify-between h-full"
                  style={{ color: props.config.textColor }}
                >
                  <div className="flex flex-col gap-1 text-start">
                    <div className="flex justify-between w-full items-center">
                      <h4 className="font-semibold">{product.title}</h4>
                      {/* <div className="border-[1px] flex justify-center items-center border-[var(--card-border-hover-color)] h-max rounded-full p-2">
                      {liked ? (
                        <BsHeartFill className="text-red-500" />
                      ) : (
                        <BsHeart />
                      )}
                    </div> */}
                    </div>
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-full opacity-70">
                      {product.description}
                      {product.description}
                    </span>
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="text-start font-bold text-lg">
                      {product.price}
                    </span>
                    <Link href={product.redirection} target="_blank">
                      <RippleButton btnClass="text-xs bg-black rounded-md px-2 py-1 text-white tracking-widest">
                        visit
                      </RippleButton>
                    </Link>
                  </div>
                </div>
              </TranslucentLayout>
            </CardLayout>
          </RippleButton>
        ))}
        {props.isSelectMode && (
          <Base
            parent={<AddProductModal config={props.config} />}
            content={addProduct}
          />
        )}
      </div>
    </ProductLayout>
  );
};

const AddProductModal = ({ config }: { config: ProductConfig }) => {
  return (
    <TranslucentLayout
      $cornerRadiusBottomLeft={config.cornerRadiusBottomLeft}
      $cornerRadiusBottomRight={config.cornerRadiusBottomRight}
      $cornerRadiusTopRight={config.cornerRadiusTopRight}
      $cornerRadiusTopLeft={config.cornerRadiusTopLeft}
      className="border-[1px] hover:border-[var(--border-focus-color)] border-[var(--card-border-hover-color)] duration-200 flex flex-col justify-center items-center text-[var(--text-secondary-color)] py-4 px-2 gap-2 cursor-pointer h-[40vh] relative group overflow-hidden invert"
    >
      <CiSquarePlus className=" text-[100px] opacity-70 group-hover:opacity-100" />
      <h1 className="opacity-70 group-hover:opacity-100">Add a new product</h1>
    </TranslucentLayout>
  );
};

export default Product_V1;
