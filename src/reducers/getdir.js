import {
  GETDIR_START,
  GETDIR_CANCEL,
  GETDIR_DONE
} from '../actions';

const initialState = {
  isFetching: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case GETDIR_START:
    return Object.assign({}, state, {
      isFetching: true,
      error: null
    });
  case GETDIR_CANCEL:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.payload.error
    });
  case GETDIR_DONE:
    return Object.assign({}, state, {
      isFetching: false,
      error: null
    });
  default:
    return state;
  }
};

export default reducer;
