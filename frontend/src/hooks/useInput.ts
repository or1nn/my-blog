import React, { useState } from "react";
import useValidation from "./useValidation";
import { ValidationsType } from "./useValidation";

const useInput = (initialValue: string, validations: ValidationsType) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replace(/[а-яА-ЯёЁ]/g, ""));
  };
  const onBlur = () => {
    setDirty(true);
  };

  return { value, onChange, onBlur, ...valid, isDirty };
};

export default useInput;
