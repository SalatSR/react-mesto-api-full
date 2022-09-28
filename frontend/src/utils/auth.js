export const baseURL = "https://api.salatsr.nomorepartiesxyz.ru";

// Проверка статуса запроса
function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
}

export const reg = (email, password) => {
  return fetch(`${baseURL}/sign-up`, {
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
  return fetch(`${baseURL}/sign-in`, {
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
