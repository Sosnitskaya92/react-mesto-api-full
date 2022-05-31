import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return(
    <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={props.isOpen}  onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="url" ref={avatarRef} className="popup__input popup__input_type_avatar" required name="avatar" id="avatar-input"   placeholder="Ссылка на картинку" />
      <span className="popup__input-error avatar-input-error"></span>
      <button className="popup__save" type="submit" aria-label="Сохранить">Создать</button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;