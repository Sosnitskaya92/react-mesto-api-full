class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      credentials: 'include',
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}cards/`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));  
  };

  editUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  };

  addCard(data) {
    return fetch(`${this._baseUrl}cards/`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  };

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }

  putCardLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }

  deleteCardLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: 'include',
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return api.deleteCardLike(cardId);
    } else {
      return api.putCardLike(cardId);
    }
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      credentials: 'include', 
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }
};

const api = new Api({
  baseUrl: 'api.domainname.sosnitskay.nomoredomains.sbs', 
})
// const api = new Api({
//   baseUrl: 'http://localhost:3000',
// })

export default api;