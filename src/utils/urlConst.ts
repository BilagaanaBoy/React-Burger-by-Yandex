const wsApiOrderURL = 'wss://norma.nomoreparties.space/orders/all';
const wsUserApiOrderURL = 'wss://norma.nomoreparties.space/orders';
const baseUrl = "https://norma.nomoreparties.space/api/";

const checkReponse = (response: Response) => {
    return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
  };
export { wsApiOrderURL, baseUrl, wsUserApiOrderURL ,checkReponse };

