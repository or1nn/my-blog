import { useState, useEffect } from "react";

export type ValidationsType = {
  minLength: number,
  isEmpty?: boolean,
  isEmail?: boolean,
} 

const useValidation = (value: string, validations: ValidationsType) => {
  const [isEmpty, setEmpty] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "isEmail":
          String(value)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
            ? setEmailError(false)
            : setEmailError(true);
          break;
      }
    }
  }, [value, validations]);
  useEffect(() => {
    if(isEmpty || minLengthError || emailError) {
      setInputValid(false)
    } else {
      setInputValid(true)
    }
  }, [isEmpty, minLengthError, emailError])
  return {
    isEmpty,
    minLengthError,
    emailError,
    inputValid
  };
};

export default useValidation;
