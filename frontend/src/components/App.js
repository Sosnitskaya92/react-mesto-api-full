import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as Auth from '../utils/Auth';

function App(props) {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [userEmail, setUserEmail] = React.useState('');

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [InfoTooltipStatus, setInfoTooltipStatus] = React.useState(true);

  const [isInfoTooltipOpen, setisInfoTooltipOpen] = React.useState(false);

  const history = useHistory();

  React.useEffect(()=>{
    if (loggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .then(handleTokenCheck())
      .catch(err => console.log(err))
    }
  }, [])

  function signOut() {
    localStorage.removeItem("token");
    props.history.push("/signin");
  }

  function handleLogin() {
    setLoggedIn(true);
    handleTokenCheck()
  }

  function handleLoginSubmit({ email, password }, callbackSetValues) {
    Auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          callbackSetValues();
          handleLogin();
          localStorage.setItem('token', res.token);
          history.push('/')
        } else {
         changeInfoTooltipstatus(); 
         openInfoTooltip();
        }
      })
      .catch(err => console.log(err));
  };

  function handleRegisterSubmit({ email, password }) {
    Auth.register(email, password)
      .then((res) => {
        if (!res.error) {
          openInfoTooltip();
          history.push('/signin')
        } else {
          openInfoTooltip();
        }
    })
      .catch(err => console.log(err))
    };

  React.useEffect(() => {
    handleTokenCheck()
  }, [handleTokenCheck])

  function handleTokenCheck() {
    const token = localStorage.getItem('token');

    if (token) {     
      Auth.checkToken(token)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push('/');
            }
        })
        .catch(err => console.log(err))
    }
  };

  function handleCardLike(likes, _id) {
    const isLiked = likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(_id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === _id ? newCard : c)));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(_id) {
    api.deleteCard(_id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== _id));
      })
      .catch(err => console.log(err))
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function changeInfoTooltipstatus() {
    setInfoTooltipStatus(false);
  }

  function openInfoTooltip() {
    setisInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''})
    setInfoTooltipStatus(true);
    setisInfoTooltipOpen(false);
  };

  function handleCardClick(name, link) {
    setSelectedCard({name, link})
  };

  function handleUpdateUser(name, about) {
    api.editUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header email={userEmail} loggedIn={loggedIn} onSignOut={signOut}/>
          <Switch>

            <ProtectedRoute 
              exact path="/"
              loggedIn={loggedIn}
              component={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} handleClick={handleCardClick} handleCardLike={handleCardLike} handleCardDelete={handleCardDelete} cards={cards} 
            />

            <Route path="/signup">
              <Register changeInfoTooltipstatus={changeInfoTooltipstatus} openInfoTooltip={openInfoTooltip} onRegisterSubmit={handleRegisterSubmit} />
            </Route>

            <Route path="/signin">
              <Login handleLogin={handleLogin} onLoginSubmit={handleLoginSubmit}/>
            </Route>

          </Switch>
          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen}  onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>

          <EditAvatarPopup  isOpen={isEditAvatarPopupOpen}  onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>

          <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups}>
            <button  className="popup__delete" type="submit">Да</button>
          </PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip isOpen={isInfoTooltipOpen} status={InfoTooltipStatus} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
