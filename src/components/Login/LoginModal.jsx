import React from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const LoginModal = ({
  activeModal,
  handleCloseClick,
  handleLogin,
  loginErrorMessage,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleLogin(values)
        .then(() => {
          resetForm(); // Reset form on success
          handleCloseClick();
        })
        .catch((err) => console.error("Login failed:", err)); // Log additional errors if needed
    }
  };

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Login"
      onSubmit={handleSubmit}
      activeModal={activeModal}
      handleCloseClick={handleCloseClick}
      isDisabled={!isValid}
    >
      {loginErrorMessage && (
        <div className="modal__error-message">{loginErrorMessage}</div>
      )}
      <label className="modal__label-form">
        Email
        <input
          type="email"
          className="modal__input"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="email"
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>
      <label className="modal__label-form">
        Password *
        <input
          type="password"
          className="modal__input"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <span className="modal__error">{errors.password}</span>
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
