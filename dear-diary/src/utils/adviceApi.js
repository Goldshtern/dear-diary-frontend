export const getAdvice = () => {
  return fetch(`https://api.adviceslip.com/advice`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject("Failed to fetch advice.");
    }
  });
};
