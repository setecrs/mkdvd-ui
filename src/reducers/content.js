import {
  PATH_CHDIR,
  GETDIR_DONE
} from '../actions';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case PATH_CHDIR:
    return [];
  case GETDIR_DONE:
    return (action.payload||{}).content||[];
  default:
    return state;
  }
};

export default reducer;
