import React from "react";

function ImagePopup(props) {
  return (
      <div className={`popup popup_open ${props.card.link ? 'popup_opened' : null}`}>
        <div className="popup__content">
          <img className="popup__image" src={props.card.link} alt={props.card.name}/>
          <p className="popup__subtitle">{props.card.name}</p>
          <button onClick={props.onClose} type="button" className="popup__close" aria-label="Закрыть"></button>
        </div>
      </div>
  )
}

export default ImagePopup;