import { BASE_URL } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export { checkResponse };

function getPages() {
  return fetch(`${BASE_URL}/pages`).then(checkResponse);
}

export { getPages };
