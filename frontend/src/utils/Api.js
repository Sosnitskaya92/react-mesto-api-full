class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    //this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Ошибка: ${res.status}`);
  }

  _errorHandler(err) {
    console.log(`Ошибка. Запрос не выполнен: ${err}`);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  };

  getInitialCards(token) {
    return fetch(`${this._baseUrl}cards/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));  
  };

  editUserInfo(data, token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  };

  addCard(data, token) {
    return fetch(`${this._baseUrl}cards/`, {
      method: 'POST',
<<<<<<< HEAD
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
=======
      credentials: 'include',
>>>>>>> 95b09a1f58efa62c41300fa0c592b07b769cad63
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  };

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }

  putCardLike(cardId, token) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }

  deleteCardLike(cardId, token) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return api.deleteCardLike(cardId, token);
    } else {
      return api.putCardLike(cardId, token);
    }
  }

  editAvatar(data, token) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }, 
      body: JSON.stringify({
        avatar: data.avatar
    })
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }
};

// const api = new Api({
//   baseUrl: 'https://api.domainname.sosnitskay.nomoredomains.sbs', 
// })
const api = new Api({
<<<<<<< HEAD
  baseUrl: 'http://localhost:3000/',
=======
  baseUrl: 'http://localhost:3000',
>>>>>>> 95b09a1f58efa62c41300fa0c592b07b769cad63
})

export default api;