class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._contentType = options.headers['Content-Type']
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
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  };

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));  
  };

  editUserInfo(name, info, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': this._contentType,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, about: info })
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  };

  addCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': this._contentType,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  };

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
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
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        'Content-Type': this._contentType,
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }

  deleteCardLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        'Content-Type': this._contentType,
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
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': this._contentType,
        'Authorization': `Bearer ${token}`,
      }, 
      body: JSON.stringify({
        avatar: data
    })
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }
};

const api = new Api({
  baseUrl: 'https://api.domainname.sosnitskay.nomoredomains.sbs', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': `application/json`,
  }
})
// const api = new Api({
//   baseUrl: 'http://localhost:3000',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': `application/json`,
//   }
// });

export default api;