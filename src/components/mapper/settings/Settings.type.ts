import { InputTypeEnum } from "@/components/formComponents/types/input.types";

export const navSettings = {
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
    }
  ]
}
