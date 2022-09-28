import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = useRef();
  
  useEffect(() => {
    avatarRef.current.value = ' ';
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return ((
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      nameForm="avatar-edit"
      btnValue="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input name="link"
        id="urlAvatarEdit"
        type="url"
        className="popup__input popup__input_type_url-avatar"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span id="urlAvatarEdit-error" className="popup__error"></span>
    </PopupWithForm>
  ));
}

export default EditAvatarPopup;