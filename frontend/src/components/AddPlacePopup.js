import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({name, link});
  }
  
  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);


  return(
    <PopupWithForm name="add" title="Новое место" isOpen={props.isOpen}  onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_type_title" type="text" name="name" id="title-input"  placeholder="Название"  required minLength="2" maxLength="30" value={name || ''} onChange={handleNameChange}/>
      <span className="popup__input-error title-input-error"></span>
      <input type="url" className="popup__input popup__input_type_link"  name="link" id="link-input" placeholder="Ссылка на картинку" required value={link || ''} onChange={handleLinkChange}/>
      <span className="popup__input-error link-input-error"></span>
      <button className="popup__save" type="submit" aria-label="Сохранить">Создать</button>
    </PopupWithForm>
  )
}

export default AddPlacePopup;