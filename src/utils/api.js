import { getToken } from "./token";
import { BASE_URL } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export { checkResponse };

function getPages() {
  const token = getToken();
  return fetch(`${BASE_URL}/pages`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

export { getPages };

function postPages(title, text, imageUrl) {
  const token = getToken();
  return fetch(`${BASE_URL}/pages`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, text, imageUrl }),
  }).then(checkResponse);
}

export { postPages };

function getUserInfo() {
  const token = getToken();
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

export { getUserInfo };
