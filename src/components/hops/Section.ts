import {
  GlobalInputIncomingType,
  InputTypeEnum,
} from "../formComponents/types/input.types";

export type singleSectionType = {
  heading: string;
  subHeading: string;
  inputs: GlobalInputIncomingType[];
};

// for any input as uploader add their names here for uploading
export const imageFileNames = ["logo"];

// export const imageFirebaseFileNameMapper = {
//   logo: "brandName"
// }

export const imageFirebaseFileNameMapper = (value:string): string => {
  switch (value){
    case "logo":
      return "brandName";
    default:
      return value;
  }
}


export const basicInfoSection: singleSectionType[] = [
  {
    heading: "Company Profile",
    subHeading:
      "Basic details about your company for us to know you better. This information wont be available to general public.",
    inputs: [
      {
        type: InputTypeEnum.TEXT_INPUT,
        placeholder: "Company's public name",
        regexMatch: /^[a-zA-Z0-9\s]{3,20}$/,
        name: "companyName",
        preText: "",
        postText: "",
        header: "Company Name",
        label: "",
        valueTransformer: (value: string) => value,
        showError: false,
        errorTextForRegex:
          "The name must contain atleast 3 characters and atmax 15 and must not include any special characters",
        maxLength: 20,
        required: true,
      },
      {
        type: InputTypeEnum.NUMBER_INPUT,
        placeholder: "Phone number",
        regexMatch: /^\d{10}$/,
        preText: "+91",
        name: "officialPhone",
        postText: "",
        label: "",
        header: "Official Contact number",
        showError: false,
        valueTransformer: (value: string) => value.substring(0, 10),
        errorTextForRegex: "phone numbe",
        required: true,
        max: 10,
      },
      {
        type: InputTypeEnum.TEXT_INPUT,
        placeholder: "Email",
        regexMatch: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        preText: "",
        name: "officialEmail",
        postText: "",
        label: "",
        header: "Official Email Address",
        showError: true,
        valueTransformer: (value: string) => value.split(" ").join("-"),
        errorTextForRegex: "",
        required: true,
      },
    ],
  },
  {
    heading: "Customer Service",
    subHeading: "For us or your customers to reach out to you.",
    inputs: [
      {
        type: InputTypeEnum.NUMBER_INPUT,
        placeholder: "Phone number",
        regexMatch: /^\d{10}$/,
        preText: "+91",
        name: "customerServicePhone",
        postText: "",
        label: "",
        header: "Customer Service Contact number",
        showError: true,
        valueTransformer: (value: string) => value.substring(0, 10),
        errorTextForRegex: "",
        required: false,
        max: 10,
      },
      {
        type: InputTypeEnum.TEXT_INPUT,
        placeholder: "Email",
        regexMatch: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        preText: "",
        name: "customerServiceEmail",
        postText: "",
        label: "",
        header: "Customer Service Email Address",
        showError: true,
        valueTransformer: (value: string) => value.split(" ").join("-"),
        errorTextForRegex: "",
        required: true,
      },
    ],
  },
  {
    heading: "Terms and Conditions",
    subHeading: "Your companys terms and conditions if any.",
    inputs: [
      {
        type: InputTypeEnum.TEXT_AREA_INPUT,
        placeholder: "Companys Privacy policy, supports markdown format",
        regexMatch: /^\S.*\S$/,
        name: "privacyPolicy",
        header: "Privacy policy",
        label: "",
        valueTransformer: (value: string) => value,
        showError: false,
        errorTextForRegex:
          "The name must contain atleast 3 characters and atmax 15 and must not include any special characters",
        maxLength: 100,
        required: false,
        rows: 4,
      },
      {
        type: InputTypeEnum.TEXT_AREA_INPUT,
        placeholder: "Company's Terms and Conditions, supports markdown format",
        regexMatch: /^\S.*\S$/,
        name: "termsAndConditions",
        header: "Terms and Conditions",
        label: "",
        valueTransformer: (value: string) => value,
        showError: false,
        errorTextForRegex:
          "The name must contain atleast 3 characters and atmax 15 and must not include any special characters",
        maxLength: 100,
        required: false,
        rows: 8,
      },
    ],
  },
];

export const brandInfoSection: singleSectionType[] = [
  {
    heading: "Public Profile",
    subHeading: "This will be displayed on your page",
    inputs: [
      {
        type: InputTypeEnum.TEXT_INPUT,
        placeholder: "Brand's public name",
        regexMatch: /^[a-zA-Z0-9\s]{3,20}$/,
        name: "brandName",
        preText: "",
        postText: "",
        header: "Brand Name",
        label: "",
        valueTransformer: (value: string) => value,
        showError: false,
        errorTextForRegex:
          "The name must contain atleast 3 characters and atmax 15 and must not include any special characters",
        maxLength: 20,
        required: true,
      },
      {
        type: InputTypeEnum.TEXT_INPUT,
        placeholder: "Your desired link",
        regexMatch: /^\S.*\S$/,
        preText: "hostname://",
        name: "link",
        postText: "",
        label: "",
        header: "",
        showError: false,
        valueTransformer: (value: string) => value.split(" ").join("-"),
        errorTextForRegex: "",
        required: true,
        maxLength: 20,
      },
    ],
  },
  {
    heading: "Company Logo",
    subHeading: "Choose what you want to display",
    inputs: [
      {
        type: InputTypeEnum.IMAGE_UPLOADER,
        name: "logo",
        required: true,
        error: "",
      },
      {
        type: InputTypeEnum.CHECKBOX_INPUT,
        multiSelect: false,
        options: [
          {
            value: "CLOTH",
            label: "Clothing",
          },
          {
            value: "ELECTRONICS",
            label: "Electronics",
          },
          {
            value: "Service",
            label: "Service",
          },
          {
            value: "Food",
            label: "Food Item",
          },
        ],
        name: "category",
        header: "Category",
        required: true,
      },
    ],
  },
  {
    heading: "Social Profiles",
    subHeading: "Where to find you",
    inputs: [
      {
        type: InputTypeEnum.TEXT_INPUT,
        placeholder: "Instagram Profile Name",
        regexMatch: /^\S.*\S$/,
        name: "instagramAccount",
        preText: "instagram.com//",
        postText: "",
        header: "",
        label: "",
        valueTransformer: (value: string) => value,
        showError: false,
        errorTextForRegex:
          "The name must contain atleast 3 characters and atmax 15 and must not include any special characters",
        required: false,
        maxLength: 100,
      },
      {
        type: InputTypeEnum.TEXT_INPUT,
        placeholder: "Facebook Profile Name",
        regexMatch: null,
        preText: "facebook://",
        name: "facebookAccount",
        postText: "",
        label: "",
        header: "",
        showError: false,
        valueTransformer: (value: string) => value,
        errorTextForRegex: "",
        required: false,
        maxLength: 100,
      },
      {
        type: InputTypeEnum.TEXT_INPUT,
        placeholder: "other links",
        regexMatch: null,
        preText: "https://",
        name: "otherAccount",
        postText: "",
        label: "",
        header: "",
        showError: false,
        valueTransformer: (value: string) => value,
        errorTextForRegex: "",
        required: false,
        maxLength: 100,
      },
    ],
  },
  {
    heading: "Culture",
    subHeading: "You, yourself and your company",
    inputs: [
      {
        type: InputTypeEnum.TEXT_AREA_INPUT,
        placeholder:
          "Companys Slogan or Tagline, how would people remmeber you.",
        regexMatch: /^\S.*\S$/,
        name: "motto",
        header: "Motto",
        label: "",
        valueTransformer: (value: string) => value,
        showError: false,
        errorTextForRegex:
          "The name must contain atleast 3 characters and atmax 15 and must not include any special characters",
        maxLength: 100,
        required: false,
        rows: 4,
      },
      {
        type: InputTypeEnum.TEXT_AREA_INPUT,
        placeholder: "Describe your company and your work.",
        regexMatch: /^\S.*\S$/,
        name: "description",
        header: "Description",
        label: "",
        valueTransformer: (value: string) => value,
        showError: false,
        errorTextForRegex:
          "The name must contain atleast 3 characters and atmax 15 and must not include any special characters",
        maxLength: 100,
        required: true,
        rows: 8,
      },
    ],
  },
];
