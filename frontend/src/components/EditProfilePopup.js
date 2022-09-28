import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return ((
    <PopupWithForm name="profile"
      title="Редактировать профиль"
      nameForm="profile-info"
      btnValue="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input name="name"
        id="name"
        type="text"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_name"
        placeholder="ФИО"
        required
        value={name || ''}
        onChange={handleNameChange}
      />
      <span id='name-error' className="popup__error"></span>
      <input name="job"
        id="job"
        type="text"
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_type_job"
        placeholder="Специальность"
        required
        value={description || ''}
        onChange={handleAboutChange}
      />
      <span id='job-error' className="popup__error"></span>
    </PopupWithForm>
  ));
}

export default EditProfilePopup;