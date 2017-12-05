import { apiSubroutine } from '../external';
import { getDir } from './getdir';

export const SUBROUTINE_START = 'SUBROUTINE_START';
export const SUBROUTINE_CANCEL = 'SUBROUTINE_CANCEL';
export const SUBROUTINE_DONE = 'SUBROUTINE_DONE';
export const SUBROUTINE_SET_PARAMETER = 'SUBROUTINE_SET_PARAMETER';

export const subroutineStart = (type) => ({
  type: SUBROUTINE_START,
  payload: { type},
});

export const subroutineSetParameter = (key, value) => ({
  type: SUBROUTINE_SET_PARAMETER,
  payload: {
    key,
    value
  }
});

export const subroutineParameters = (parameters) => ({
  type: SUBROUTINE_CANCEL,
  payload: { parameters },
});

export const subroutineCancel = (error) => ({
  type: SUBROUTINE_CANCEL,
  payload: { error },
});

export const subroutineDone = () => ({
  type: SUBROUTINE_DONE,
});

export const subroutine = (path, type) => (dispatch, getState) => {
  dispatch(subroutineStart(type));
  const state = getState();
  return apiSubroutine(type, path, state.subroutine.parameters)
    .then(res => {
      if (!res.ok){
        return res.json()
          .then(json => {
            if (res.status === 400 && 'parameters' in json) {
              return dispatch(subroutineParameters(json.parameters));
            }
            return dispatch(subroutineCancel(json.message));
          });
      }
      return Promise.resolve()
        .then(() => dispatch(getDir()))
        .then(() => dispatch(subroutineStart(type)))
        .then(() => dispatch(subroutineDone()));
    })
    .catch(error => {
      dispatch(subroutineCancel(error));
    });
};
