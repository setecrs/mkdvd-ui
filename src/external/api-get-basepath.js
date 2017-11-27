import fetch from 'node-fetch';

export const apiGetBasePath = () => {
  const url = process.env.REACT_APP_APIURL + '/v2/basepath';
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': process.env.REACT_APP_APIURL
    }
  });
};
