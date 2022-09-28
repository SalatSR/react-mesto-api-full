import { useEffect, useCallback } from 'react';

function PopupWithForm({ btnValue, children, isOpen, name, nameForm, onClose, onSubmit, title}) {

  // /** Закрываем попапы по нажатию Escape */
  const closeByEscape = useCallback((e) => {
    if (e.key === 'Escape') {
          onClose();
        }
  }, [onClose])


  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);

      return() => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen, closeByEscape]);

  /** Закрываем попапы по нажатию вне попапа */
  const closeByClick = (e) => {
    e.target.classList.contains('popup') && onClose();
  }

  return ((
    <div
      className={`popup popup_${name} ${isOpen && 'popup_opened'}`}
      onClick={closeByClick}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__closer">
        </button>
        <h2 className="popup__header">{title}</h2>
        <form
          action="#"
          name={`form-${nameForm}`}
          className="popup__form"
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className="popup__submit-button">{btnValue}
          </button>
        </form>
      </div>
    </div>
  ));
}

export default PopupWithForm;