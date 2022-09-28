import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Card from './Card';

function Main({ cards, onCardLike, onCardDelete, onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const currentUser = useContext(CurrentUserContext);

  return ((
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-wrapper">
            <button
              onClick={onEditAvatar}
              type="button"
              className="profile__avatar-edit-button"
              aria-label="edit avatar button">
            </button>
            <img src={currentUser?.avatar}
              alt="ваше фото в профиле"
              className="profile__avatar-img" />
          </div>
          <div className="profile__text">
            <button
              onClick={onEditProfile}
              type="button"
              className="profile__edit-button"
              aria-label="edit profile button">
            </button>
            <h1 className="profile__info-name">{currentUser?.name}</h1>
            <p className="profile__info-job">{currentUser?.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button"
          aria-label="add profile button">
        </button>
      </section>

      <section className="cards">
        {cards.map((card) => {
          return ((
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))
        })}
      </section>
    </main>
  ));
}

export default Main;