const getEmailValidationErrors = (email) => {
  const validations = [];
  if (!email || email.trim().length === 0) {
    validations.push("Email is required");
    return validations;
  }
  const splittedEmail = email.split("@");
  if (splittedEmail.length !== 2 || !splittedEmail[1].includes(".")) {
    validations.push("Invalid email");
  }
  return validations;
};

const getPasswordValidationErrors = (password) => {
  const validations = [];
  if (!password || password.trim().length === 0) {
    validations.push("Password is required");
    return validations;
  }
  if (password.length < 8) {
    validations.push("Password needs to be at least 8 characters long");
  }
  const hasSpecialChar = password.match(new RegExp("[^A-Za-z0-9]"));
  if (!hasSpecialChar) {
    validations.push("Password needs to have at least one special character");
  }
  const hasNumber = password.match(new RegExp("[0-9]"));
  if (!hasNumber) {
    validations.push("Password needs to have at least one number");
  }
  return validations;
};

export const getLoginValidationErrors = (formValues) => {
  const { email, password } = formValues;
  const emailErrors = getEmailValidationErrors(email);
  const passwordErrors = getPasswordValidationErrors(password);
  return [...emailErrors, ...passwordErrors];
};
