import { apiGetRun } from "../external";

export const GETRUN_START = "GETRUN_START";
export const GETRUN_CANCEL = "GETRUN_CANCEL";
export const GETRUN_DONE = "GETRUN_DONE";

export const getRunStart = () => ({
  type: GETRUN_START
});

export const getRunCancel = error => ({
  type: GETRUN_CANCEL,
  payload: { error }
});

export const getRunDone = payload => ({
  type: GETRUN_DONE,
  payload: payload.running
});

export const getRun = () => (dispatch, getState) => {
  dispatch(getRunStart());
  apiGetRun()
    .then(res => {
      if (res.status === 403) {
        return Promise.reject("Forbidden");
      }
      return res.json().then(json => {
        if (!res.ok) {
          return Promise.reject(json.message);
        }
        return json;
      });
    })
    .then(payload => dispatch(getRunDone(payload)))
    .catch(error => {
      dispatch(getRunCancel(error));
    });
};
