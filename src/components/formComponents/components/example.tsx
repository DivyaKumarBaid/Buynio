import { InputTypeEnum } from "../types/input.types";

// this file contains example of how to use input fields
export const inputs = [
  // checkbox example
  {
    type: InputTypeEnum.CHECKBOX_INPUT,
    multiSelect: true,
    options: [
      { value: "ABC", label: "ABC" },
      { value: "efg", label: "efg" },
    ],
    name: "ABC",
    header: "EFG",
    required: true,
  },
];
