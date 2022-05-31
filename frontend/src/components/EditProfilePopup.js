import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen}  onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_type_name" type="text" name="name" id="first-name-input" placeholder="Имя"  required minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange}/>
      <span className="popup__input-error first-name-input-error"></span>
      <input className="popup__input popup__input_type_info" type="text" name="about" id="info-job-input" placeholder="О себе"  required minLength="2" maxLength="200" value={description || ''} onChange={handleDescriptionChange}/>
      <span className="popup__input-error info-job-input-error" id="title-input-error"></span>
      <button className="popup__save" type="submit" aria-label="Сохранить">Создать</button>
    </PopupWithForm>
  )
}

export default EditProfilePopup