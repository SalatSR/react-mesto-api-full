import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  
  const currentUser = useContext(CurrentUserContext);
  /** Определяем, являемся ли мы владельцем текущей карточки */
  const isOwn = card.owner._id === currentUser._id;
  /** Создаём переменную, которую после зададим в `className` для кнопки удаления */
  const cardDeleteButtonClassName = (
    `${isOwn ? 'card__delete-button' : 'card__delete-button_inactive'}`
  );
  /** Определяем, есть ли у карточки лайк, поставленный текущим пользователем */
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  /** Создаём переменную, которую после зададим в `className` для кнопки лайка */
  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  );

  function handleImageClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return ((
    <article className="card">
      <img src={card.link}
        alt="Картинка на карточке"
        className="card__img"
        onClick={handleImageClick} />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        aria-label="delete button">
      </button>
      <div className="card__name-container">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-wrapper">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="like button">
          </button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  ))
}

export default Card;