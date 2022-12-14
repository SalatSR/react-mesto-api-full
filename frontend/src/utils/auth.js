export const baseURL = "https://api.salatsr.nomoredomains.club";

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
    credentials: 'include',
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
    credentials: 'include',
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
