import {
  GETRUN_START,
  GETRUN_CANCEL,
  GETRUN_DONE
} from '../actions';

export const initialState = {
  payload: {},
  isFetching: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case GETRUN_START:
    return Object.assign({}, state, {
      isFetching: true,
      error: null
    });
  case GETRUN_CANCEL:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.payload.error
    });
  case GETRUN_DONE:
    return Object.assign({}, state, {
      payload: action.payload,
      isFetching: false,
      error: null
    });
  default:
    return state;
  }
};

export default reducer;
