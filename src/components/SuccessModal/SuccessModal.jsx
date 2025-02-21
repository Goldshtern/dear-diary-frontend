import React from "react";
import "./SuccessModal.css";

function SuccessModal({ message, onClose, onLoginClick }) {
  return (
    <div className="success-modal">
      <div className="success-modal__content">
        <p className="success-modal__message">{message}</p>
        <div className="success-modal__actions">
          <button className="success-modal__btn" onClick={onLoginClick}>
            Go to Login
          </button>
          <button className="success-modal__close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
