import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : null}`}>
      <div className="popup__container">
        <form className="popup__form popup__form_add" name={`form_${props.name}`} onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
        </form>
        <button className="popup__close"  onClick={props.onClose} type="button" aria-label="Закрыть"></button>
      </div>
    </div>
  )
}

export default PopupWithForm;