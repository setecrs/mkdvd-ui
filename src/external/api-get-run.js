import fetch from 'node-fetch';

export const apiGetRun = () => {
  const url = process.env.REACT_APP_APIURL + '/v2/running';
  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
};
