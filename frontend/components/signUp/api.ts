import { getLoginValidationErrors } from "./validations";

// Mocked API call
export const login = (data) => {
  return new Promise((res, rej) => {
    const errors = getLoginValidationErrors(data);
    if (errors.length > 0) {
      rej(errors);
    } else {
      res("success");
    }
  });
};
