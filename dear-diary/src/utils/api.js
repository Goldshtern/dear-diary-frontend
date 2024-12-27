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

function postPages(title, text) {
  return fetch(`${BASE_URL}/pages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      text,
    }),
  }).then(checkResponse);
}

export { postPages };
