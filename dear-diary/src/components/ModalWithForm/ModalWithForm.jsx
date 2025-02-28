import "./ModalWithForm.css";
import closeBtn from "../../assets/cls-btn.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  handleCloseClick,
  activeModal,
  onSubmit,
}) {
  return (
    <div className={`modal ${activeModal && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={closeBtn} alt="close button" className="modal__close-btn" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
