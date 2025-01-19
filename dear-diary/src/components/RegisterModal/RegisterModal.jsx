import React from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const RegisterModal = ({
  activeModal,
  handleCloseClick,
  handleRegistration,
}) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      handleRegistration(values)
        .then(() => {
          handleCloseClick();
        })
        .catch((err) => {
          console.error("Registration failed:", err);
        });
    } else {
      console.error("Form is invalid! Please fill in all fields.");
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
      onSubmit={handleSubmit}
      activeModal={activeModal}
      handleCloseClick={handleCloseClick}
      isButtonDisabled={!isValid}
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
          type="text"
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
