import {
  PATH_CHDIR
} from '../actions';

const initialState = '/operacoes/';

const reducer = (state=initialState, action) => {
  switch (action.type) {
  case PATH_CHDIR:
    return action.payload.path;
  default:
    return state;
  }
};

export default reducer;
