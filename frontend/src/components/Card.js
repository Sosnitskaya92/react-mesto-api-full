import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__delete ${isOwn ? ' ' : 'element__delete_inactive'}`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__heart ${isLiked ?  'element__heart_active' : ' '}`;
 
  function handleClick() {
    props.onCardClick(props.card.name, props.card.link)
  }

  function handleLikeClick() {
    props.onCardLike(props.card.likes, props.card._id);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }

  return (
    <article className="element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img className="element__image" onClick={handleClick} src={props.card.link} alt={props.card.name} />
      <div className="element__group">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="element__heart-number">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card