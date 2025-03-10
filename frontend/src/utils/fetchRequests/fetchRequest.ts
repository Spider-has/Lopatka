import { getJwtToken } from '../token';

const fetchPostRequest = async (requestUrl: string, dataObject?: object) => {
  return fetch(requestUrl, {
    method: 'POST',
    body: JSON.stringify(dataObject),
  }).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response;
  });
};

export const fetchPostRequestWithVerify = async (
  requestUrl: string,
  userToken: string,
  dataObject?: object,
) => {
  return fetch(requestUrl, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
    body: JSON.stringify(dataObject),
  }).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response;
  });
};

export const fetchPutRequestWithVerify = async (
  requestUrl: string,
  userToken: string,
  dataObject?: object,
) => {
  return fetch(requestUrl, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
    body: JSON.stringify(dataObject),
  }).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response;
  });
};

const fetchGetRequest = async (requestUrl: string) => {
  return fetch(requestUrl, {
    method: 'GET',
  }).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
};

export const fetchDeleteRequest = async (requestUrl: string) => {
  return fetch(requestUrl, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + getJwtToken(),
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
};

export { fetchGetRequest, fetchPostRequest };
