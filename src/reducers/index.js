import path from './path';
import content from './content';
import subroutines from './subroutines';
import subroutine from './subroutine';
import getDir from './getdir';

export const initialState = {
  path: '/operacoes/',
  subroutines: [],
  content: [],
  getDir: {
    error: null,
    isFetching: false,
  },
  subroutine: {
    type: null,
    error: null,
    isFetching: false,
    parameters: {},
    success: null,
  },
};

const rootReducer = (state, action) => {
  const newState = ({
    path: path((state || {}).path, action),
    content: content((state || {}).content, action),
    subroutines: subroutines((state || {}).subroutines, action),
    getDir: getDir((state || {}).getDir, action),
    subroutine: subroutine((state || {}).subroutine, action),
  });
  return newState;
};

export default rootReducer;
