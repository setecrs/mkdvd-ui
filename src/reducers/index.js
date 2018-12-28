import path from './path';
import content from './content';
import subroutines from './subroutines';
import subroutine from './subroutine';
import getDir from './getdir';
import getRun from './getrun';

export const initialState = {
  path: '/',
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

export const reducers = {
  path,
  content,
  subroutines,
  getDir,
  getRun,
  subroutine,
};
