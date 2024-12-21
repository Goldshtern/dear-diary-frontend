import React from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const RegisterModal = ({
  activeModal,
  handleCloseClick,
  formData,
  handleInputChange,
  //handleRegistration,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = () => {
    return (
      formData.email && formData.password && formData.name && formData.avatarUrl
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Form is invalid!");
    }
    handleCloseClick();
  };

  //const handleSubmit = (e) => {
  //e.preventDefault();
  //setIsLoading(true);
  //handleRegistration(formData);
  //setIsLoading(false);
  //console.log(formData);
  //handleCloseClick();
  //};

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
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
      <label className="modal__label-form">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label className="modal__label-form">
        Avatar URL
        <input
          type="text"
          className="modal__input"
          name="avatarUrl"
          value={formData.avatarUrl}
          onChange={handleInputChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
