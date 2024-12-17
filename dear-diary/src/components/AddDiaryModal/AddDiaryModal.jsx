import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddDiaryModal.css";

function DiaryModal({
  activeModal,
  handleCloseClick,
  name,
  diaryText,
  handleInputChange,
  handleAddDiary,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddDiary();
  };

  return (
    <ModalWithForm
      title="New Diary Page"
      buttonText="Add Page"
      activeModal={activeModal}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
      <label className="modal__label-form">
        Today
        <input
          className="modal__input"
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          id="name"
          placeholder="Dear, Diary"
        />
      </label>
      <label className="modal__label-form">
        Text
        <input
          type="text"
          className="modal__input"
          name="diaryText"
          value={diaryText}
          id="diaryText"
          placeholder="Diary Text"
          onChange={handleInputChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default DiaryModal;
