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
      headers: this._headers   
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}cards/`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));  
  };

  editUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  };

  addCard(data) {
    return fetch(`${this._baseUrl}cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  };

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }

  putCardLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }

  deleteCardLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
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
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
    .catch(err => this._errorHandler(err));
  }
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36/',
  headers: {
    authorization: '9bb3333e-8dc8-44bf-a219-29f503167caa',
    'Content-Type': 'application/json'
  }
})

export default api;