class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }
// Проверка статуса запроса
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Error: ${res.status} ${res.statusText}`);
  }
// Получаем карточки с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }
// Получаем данные пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }
// Отправляем данные пользователя
  setUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(res => this._checkResponse(res))
  }
// Заменяем аватар пользователя
  editProfileAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(
        item
      )
    })
    .then(res => this._checkResponse(res))
  }
// Отправляем данные новой карточки
  addNewCard(item) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
    .then(res => this._checkResponse(res))
  }
// Удаляем карточку
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }
// Ставим лайк
  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }
// Убираем лайк
  unlikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '646992da-1ad1-4569-97b4-38159e3734ad',
    'Content-Type': 'application/json'
  }
});

export default api;