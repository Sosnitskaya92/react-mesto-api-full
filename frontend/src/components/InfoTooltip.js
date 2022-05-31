import React from "react";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : null}`}>
      <div className="popup__container">
        {props.status === true ? (
          <div className="popup__info-container">
            <div className="popup__info-success"></div>
            <p className="popup__text">Вы успешно зарегистрировались!</p>
          </div>
          ) : (
          <div className="popup__info-container">
            <div className="popup__info-unsuccess"></div>
            <p className="popup__text">Что-то пошло не так! Попробуйте ещё раз.</p>
          </div>
        )}
        <button className="popup__close"  onClick={props.onClose} type="button" aria-label="Закрыть"></button>
      </div>
    </div>
  )
}

export default InfoTooltip;