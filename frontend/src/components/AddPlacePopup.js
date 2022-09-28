import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const nameRef = useRef();
  const linkRef = useRef();

  useEffect(() => {
    nameRef.current.value = ' ';
    linkRef.current.value = ' ';
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return ((
    <PopupWithForm
      name="card"
      title="Новое место"
      nameForm="card-info"
      btnValue="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        id="title"
        type="text"
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_type_title"
        placeholder="Название"
        required
        ref={nameRef}
      />
      <span id="title-error" className="popup__error"></span>
      <input
        name="link"
        id="url"
        type="url"
        className="popup__input popup__input_type_url"
        placeholder="Ссылка на картинку"
        required
        ref={linkRef}
      />
      <span id="url-error" className="popup__error"></span>
    </PopupWithForm>
  ));
}

export default AddPlacePopup;