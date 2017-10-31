import querystring from 'querystring';
import fetch from 'node-fetch';

export const apiGetDir = (path) => {
  const url = process.env.REACT_APP_APIURL + '/v2/directory?' + querystring.stringify({
    path: path
  });
  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
};
