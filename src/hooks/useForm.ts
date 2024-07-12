import { ChangeEvent, useEffect, useState } from "react";

const useForm = (
  initialValues: Record<string, any>,
  updateOnEffect?: boolean
): [
  values: Record<string, any>,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
] => {
  // Ensure all initial values are defined
  const getDefinedInitialValues = (values: Record<string, any>) => {
    const definedValues: Record<string, any> = {};
    for (const key in values) {
      definedValues[key] = values[key] !== undefined ? values[key] : "";
    }
    return definedValues;
  };

  const [values, setValues] = useState<Record<string, any>>(
    getDefinedInitialValues(initialValues)
  );

  useEffect(() => {
    if (updateOnEffect) {
      setValues(getDefinedInitialValues(initialValues));
    }
  }, [initialValues, updateOnEffect]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = event.target;
    setValues((prevFormData) => ({
      ...prevFormData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files?.[0] : value,
    }));
  };

  return [values, handleChange];
};

export default useForm;
