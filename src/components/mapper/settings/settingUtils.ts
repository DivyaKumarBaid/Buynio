import {
  CAROUSEL_TYPE,
  PRODUCT_TYPE,
  SECTION_TYPE,
} from "@/types/mapper.types";

export const getBackground = (
  section: Record<string, any>,
  defaultBackground: string
) => {
  switch (section.type) {
    case SECTION_TYPE.CAROUSEL:
      return section.config?.background || defaultBackground;
    case SECTION_TYPE.PRODUCT:
      return section.config?.background || defaultBackground;
    default:
      return defaultBackground;
  }
};

export const getDefaultSectionConfig: Record<string, Record<string, any>> = {
  [SECTION_TYPE.CAROUSEL]: {
    type: SECTION_TYPE.CAROUSEL,
    subType: CAROUSEL_TYPE.CAROUSEL_V1,
    config: {
      background: "rgba(0,0,0,0)",
      slideImages: [
        {
          title: "Baby",
          redirection: "https://divyakrbaid.me",
          src: "https://images.unsplash.com/photo-1704326163357-cf0a659c226c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Baby2",
          redirection: "https://divyakrbaid.me",
          src: "https://images.unsplash.com/photo-1683009427666-340595e57e43?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
        },
      ],
      sliderBtnColor: "#fff",
      autoplaySpeed: 5000,
      autoplay: true,
    },
  },
  [SECTION_TYPE.PRODUCT]: {
    type: SECTION_TYPE.PRODUCT,
    subType: PRODUCT_TYPE.PRODUCT_V1,
    config: {
      background: "#000000",
      headingText: "Featured Products",
      headingColor: "#ffffff",
      headingSize: "28",
      headingPlacement: "Start",
      subHeadingText: "heck out our latest products",
      subHeadingColor: "#555555",
      subHeadingPlacement: "Start",
      cornerRadiusBottomLeft: "12",
      cornerRadiusBottomRight: "12",
      cornerRadiusTopRight: "12",
      cornerRadiusTopLeft: "12",
      subHeadingSize: "18",
      products: [
        {
          title: "Product 1",
          description: "This is a great product.",
          price: "$19.99",
          redirection: "https://github.com/",
          src: [
            "https://plus.unsplash.com/premium_photo-1705479742826-cb265b9d6999?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
          background: "#ffffff",
        },
        {
          title: "Product 2",
          description: "This is another great product.",
          price: "$29.99",
          redirection: "https://github.com/",
          src: [
            "https://plus.unsplash.com/premium_photo-1705479742826-cb265b9d6999?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
          background: "#ffffff",
        },
        {
          title: "Product 2",
          description: "This is another great product.",
          price: "$29.99",
          redirection: "https://github.com/",
          src: [
            "https://plus.unsplash.com/premium_photo-1705479742826-cb265b9d6999?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
          background: "#ffffff",
        },
        {
          title: "Product 2",
          description: "This is another great product.",
          price: "$29.99",
          redirection: "https://github.com/",
          src: [
            "https://plus.unsplash.com/premium_photo-1705479742826-cb265b9d6999?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
          background: "#ffffff",
        },
      ],
      cardColor: "#fff",
      textColor: "#000",
      showPrice: true,
    },
  },
};
