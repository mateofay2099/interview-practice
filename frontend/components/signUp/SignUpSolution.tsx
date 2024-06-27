import { useState } from "react";
import { getLoginValidationErrors } from "./validations";
import { login } from "./api";

const inputStyle = {
  fontSize: "1rem",
  padding: "0.5rem 1rem",
  border: "1px solid grey",
  borderRadius: "12px",
};

export const SignUpSolution = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    errors: [],
  });

  const updateFormValue = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: value,
      errors: [],
    }));
  };

  const validateAndSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = getLoginValidationErrors(formState);
    if (validationErrors.length > 0) {
      return setFormState((prev) => ({
        ...prev,
        errors: validationErrors,
      }));
    }

    try {
      await login({ email: formState.email, password: formState.password });
      alert("Successfully signed up!");
    } catch (error) {
      alert("Failed to sign up");
    }
    // In a real application, you would redirect the user to a login or error screen, instead of showing alerts
  };

  return (
    <form
      onSubmit={validateAndSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
        maxWidth: "30rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "0.5rem",
        }}
      >
        <label htmlFor="email">Email:</label>
        <input
          value={formState.email}
          onChange={updateFormValue}
          placeholder="some-email@domain.com"
          id="email"
          style={inputStyle}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "0.5rem",
        }}
      >
        <label htmlFor="password">Password:</label>
        <input
          value={formState.password}
          onChange={updateFormValue}
          id="password"
          type="password"
          style={inputStyle}
        />
      </div>
      {formState.errors.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "0.5rem",
            border: "1px solid red",
            borderRadius: "12px",
            padding: "0.5rem",
            marginTop: "0.5rem",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
          }}
        >
          {formState.errors.map((error) => (
            <p style={{ color: "black", fontSize: "0.8rem" }}>{error}</p>
          ))}
        </div>
      )}
      <button
        type="submit"
        style={{
          width: "10rem",
          margin: "0.5rem auto",
          border: "1px solid grey",
        }}
      >
        Sign Up
      </button>
    </form>
  );
};
