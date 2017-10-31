import fetch from 'node-fetch';

export const apiSubroutine = (action, path, parameters) => {
  const url = process.env.REACT_APP_APIURL + '/v2/directory';
  const parametersObj = {};
  Object.keys(parameters).forEach(key => {
    if (parameters[key].type === 'number') {
      parametersObj[key] = Number(parameters[key].value);
    } else {
      parametersObj[key] = parameters[key].value;
    }
  });
  return fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.assign({},{
      action: action.toString(),
      path: path.toString(),
    }, parametersObj))
  });
};
