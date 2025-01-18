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
        URL
        <input
          type="url"
          className="modal__input"
          name="imageUrl"
          value={imageUrl}
          id="imageURL"
          placeholder="Enter your diary URL here..."
          required
          onChange={handleInputChange}
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
          placeholder="Write your diary text here..."
          required
          onChange={handleInputChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default DiaryModal;
