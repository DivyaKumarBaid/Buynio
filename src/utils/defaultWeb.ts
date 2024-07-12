export const web = {
  GENERAL: {
    brandName: "Hopster",
    logo: "https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png",
    currency: "INR",
    background: "#101010",
    headingFontColor: "#ffffff",
    paragraphFontColor: "#ffffff",
    headingFontFamily: "poppins",
    paragraphFontFamily: "poppins",
    baseFontSize: 16,
    customCSSClasses: [],
    metaTags: [],

    // Add more general settings here as needed
  },
  NAVBAR: {
    isSticky: true,
    background: "#000",
    headerFontColor: "#fff",
    linkFontColor: "#eee",
    linkFontStyle: "poppins",
    headerFontStyle: "poppins",
    type: "NAV_V3",
    links: [
      { link: "Instagram", redirection: "https://insta" },
      { link: "Instagram", redirection: "https://insta" },
    ],
    collapsable: true,
    logo: "https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png",
    logoSize: 20,
    logoVisibility: true,
    headerVisibility: true,
    brandName: "Hopster",

    // Add more navbar settings here if needed
  },
  headerConfig: {
    fontStyle: "poppins",
    fontColor: "#fff",
  },
  textConfig: {
    fontStyle: "poppins",
    fontPrimaryColor: "#fff",
    fontSecondaryColor: "#eee",
  },
  sections: [
    {
      type: "CAROUSEL",
      background: "#121212",
      subType: "CAROUSEL_V1",
      config: {
        images: [
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
        interval: 5000,
      },
    },
    {
      type: "CAROUSEL",
      background: "#121212",
      subType: "CAROUSEL_V1",
      config: {
        images: [
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
        interval: 5000,
      },
    },
  ],
};

// {
//     nav: {
//         sticky: Boolean,
//         background: String,
//         headerFontColor : String,
//         linkFontColor : String,
//         linkFontStyle : String,
//         headerFontStyle : String,
//         type: String,
//         links : {link: String, redirection: String}[],
//         collapsable : Boolean,
//         logo: String,
//         brandName: String
//     },
//     brandName: String,
//     logo: String,
//     currency: String,
//     background: String,
//     header: {
//         fontStyle: String,
//         fontColor: String
//     }
//     text: {
//         fontStyle: String,
//         fontPrimaryColor: String,
//         fontSecondaryColor: String
//     },
//     sections:[
//         {
//             sectionType: Hero,
//             subType: String,
//             config: {
//                 images: String[],
//                 delay: Number,
//                 autoScrollEnabled: Boolean,
//                 userScrollEnabled: Boolean,
//             }
//             | {
//                 image: String,
//             }
//             | {
//                 heading: String,
//                 description: String,
//                 Button text: String,
//                 redirectTo : String,
//                 image : String,
//                 background: String,
//             }
//         },
//         {
//             sectionType: Product,
//             subType: String
//             config: {
//                 description: String,
//                 name: String,
//                 variants: {
//                     name: String,
//                     images: String[],
//                     price: Number,
//                     discount: Number(in percentage),
//                     variantDescription: String
//                 }[],
//                 defaultVariant:{
//                     name: String,
//                     images: String[],
//                     price: Number,
//                     discount: Number(in percentage),
//                     variantDescription: String
//                 }
//             }
//         },
//         {
//             sectionType: FeaturedProduct,
//             subType: String
//             config: {
//                 description: String,
//                 name: String,
//                 variants: {
//                     name: String,
//                     images: String[],
//                     price: Number,
//                     discount: Number(in percentage),
//                     variantDescription: String,
//                     tag: type["New", "Latest", "Trending", "Limited"]
//                 }[],
//                 defaultVariantIndex: Number,
//             }
//         }
//     ]
// }

// enum Section = {
//     NAV
//     Hero
//     FeaturedProduct
//     Products
//     aboutUs
//     testimonials
//     sponsors
//     stats
// }
