import React from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const RegisterModal = ({
  activeModal,
  handleCloseClick,
  handleRegistration,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleRegistration(values)
        .then(() => {
          resetForm();
          handleCloseClick();
        })
        .catch((err) => console.error("Registration failed:", err));
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
      onSubmit={handleSubmit}
      activeModal={activeModal}
      handleCloseClick={handleCloseClick}
      isDisabled={!isValid}
    >
      <label className="modal__label-form">
        Email
        <input
          type="email"
          className="modal__input"
          name="email"
          placeholder="Enter email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.email}</span>
      </label>
      <label className="modal__label-form">
        Password *
        <input
          type="password"
          className="modal__input"
          name="password"
          placeholder="Enter password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.password}</span>
      </label>
      <label className="modal__label-form">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Enter your name"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.name}</span>
      </label>
      <label className="modal__label-form">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          name="avatarUrl"
          placeholder="Enter URL"
          required
          value={values.avatarUrl || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.avatarUrl}</span>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
