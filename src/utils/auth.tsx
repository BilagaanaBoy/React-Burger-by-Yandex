import { checkReponse } from '../services/actions/authActions';
import  baseUrl  from './urlConst';
// const authURL = new URL('auth/', baseUrl );

const forgotPasswordURL: any = new URL('password-reset/', baseUrl );
const resetPasswordURL: any = new URL('reset', forgotPasswordURL );

export const forgotPassword = (email: string) => {
  return fetch(forgotPasswordURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkReponse);
};

export const resetPassword = (password: string, code: string) => {
  return fetch(resetPasswordURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      token: code,
    }),
  }).then(checkReponse);
};