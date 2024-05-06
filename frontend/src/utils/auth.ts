import { fetchPostRequest, fetchPostRequestWithVerify } from './fetchRequests/fetchRequest';
import { getJwtToken, getToken, setJwtToken } from './token';

export const signIn = (userEmail: string, password: string) => {
  const response = fetchPostRequest('http://localhost:8000/auth/sign-in', {
    userEmail: userEmail,
    password: password,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error occurred!');
      }
      return response.json();
    })
    .then(response => {
      if (response.token) setJwtToken(response.token);
      getToken(response);
      return response;
    });
  return response;
};

export const isUserAuthCorrect = async (): Promise<boolean> => {
  const token = getJwtToken();
  return await fetchPostRequestWithVerify('http://localhost:8000/auth/token-check', token ? token : '')
    .then(response => {
      if (response.ok) return true;
      throw new Error();
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};
