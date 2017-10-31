import { getDir } from './getdir';
export const PATH_CHDIR = 'PATH_CHDIR';
export const chdir = (path) => dispatch => {
  dispatch({
    type: PATH_CHDIR,
    payload: {path}
  });
  dispatch(getDir());
};
