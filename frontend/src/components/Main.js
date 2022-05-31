import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from './Card';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__left">
          <div className=" profile__avatar-edit" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__edit" onClick={props.onEditProfile} type="button" aria-label="Редактировать"></button>
            </div>
            <p className="profile__text">{currentUser.about}</p>
          </div>
        </div> 
        <button className="profile__add" onClick={props.onAddPlace} type="button" aria-label="Добавить"></button>
      </section>
      <section className="elements">
         {props.cards.map(item =>
           <Card card={item} key={item._id} name={item.name} link={item.link} owner={item.owner._id}  onCardClick={props.handleClick} onCardLike={props.handleCardLike} onCardDelete={props.handleCardDelete} />) 
         }
      </section>
    </main>
    )
}

export default Main;