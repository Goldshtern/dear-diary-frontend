import React from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
const LoginModal = ({
  activeModal,
  handleCloseClick,
  formData,
  handleInputChange,
}) => {
  const isFormValid = () => {
    return formData.email && formData.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Form is invalid!");
    }
  };

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Login"
      onSubmit={handleSubmit}
      activeModal={activeModal}
      handleCloseClick={handleCloseClick}
    >
      <label className="modal__label-form">
        Email
        <input
          type="email"
          className="modal__input"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <label className="modal__label-form">
        Password *
        <input
          type="password"
          className="modal__input"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
