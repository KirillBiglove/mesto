export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => this._checkResult(res));
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => this._checkResult(res));
  }

  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `Kirill Biglove`,
        about: `not programmist^^`,
      })
    })
      .then(res => this._checkResult(res));
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(res => this._checkResult(res))
  }

  setLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => this._checkResult(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResult(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResult(res));
  }

  changeAvatar(avatarUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      })
    })
      .then(res => this._checkResult(res));
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}



