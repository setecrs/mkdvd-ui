import { apiGetDir } from "../external";

export const GETDIR_START = "GETDIR_START";
export const GETDIR_CANCEL = "GETDIR_CANCEL";
export const GETDIR_DONE = "GETDIR_DONE";

export const getDirStart = () => ({
  type: GETDIR_START
});

export const getDirCancel = error => ({
  type: GETDIR_CANCEL,
  payload: { error }
});

export const getDirDone = payload => ({
  type: GETDIR_DONE,
  payload
});

export const getDir = () => (dispatch, getState) => {
  dispatch(getDirStart());
  const { path } = getState();
  apiGetDir(path)
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
    .then(payload => dispatch(getDirDone(payload)))
    .catch(error => {
      dispatch(getDirCancel(error));
    });
};
