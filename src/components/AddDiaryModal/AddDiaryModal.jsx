import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddDiaryModal.css";

function DiaryModal({
  activeModal,
  handleCloseClick,
  diaryTitle,
  diaryText,
  imageUrl,
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
          name="diaryTitle"
          value={diaryTitle}
          onChange={handleInputChange}
          id="diaryTitle"
          placeholder="'A Day to Remember'"
          required
        />
      </label>
      <label className="modal__label-form">
        Image
        <input
          type="url"
          className="modal__input"
          name="imageUrl"
          value={imageUrl}
          id="imageUrl"
          placeholder="Add your image URL here..."
          required
          onChange={handleInputChange}
        />
      </label>
      <label className="modal__label-form">
        Text
        <input
          className="modal__input"
          type="text"
          name="diaryText"
          value={diaryText}
          onChange={handleInputChange}
          id="diaryText"
          placeholder="Write your diary text here..."
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default DiaryModal;
