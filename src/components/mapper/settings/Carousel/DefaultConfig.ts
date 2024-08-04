import { SECTION_TYPE } from "@/types/mapper.types";

export const getDefaultSectionConfig: Record<string, Record<string,any>> = {
  [SECTION_TYPE.CAROUSEL]: {
    type: "CAROUSEL",
    subType: "CAROUSEL_V1",
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
  
  }
};
