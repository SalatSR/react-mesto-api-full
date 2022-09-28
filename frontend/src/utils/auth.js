export const baseURL = "https://auth.nomoreparties.co";

// Проверка статуса запроса
function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
}

export const reg = (email, password) => {
  return fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email
    })
  })
  .then((res => checkResponse(res)))
};

export const auth = (email, password) => {
  return fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then((res => checkResponse(res)))
};

export const checkToken = (token) => {
  return fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    });
};