import {
  SUBROUTINE_START,
  SUBROUTINE_CANCEL,
  SUBROUTINE_DONE,
  SUBROUTINE_SET_PARAMETER,
  PATH_CHDIR,
} from '../actions';

const initialState = {
  type: null,
  isFetching: false,
  error: null,
  parameters: {},
  success: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case PATH_CHDIR:
    return Object.assign({}, state, {
      type: null,
      isFetching: false,
      parameters: {},
      error: null,
      success: null,
    });
  case SUBROUTINE_START:
    return Object.assign({}, state, {
      type: action.payload.type,
      isFetching: true,
      error: null,
      success: null,
    });
  case SUBROUTINE_CANCEL:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.payload.error || null,
      parameters: action.payload.parameters || {}
    });
  case SUBROUTINE_SET_PARAMETER:
    return Object.assign({}, state, {
      parameters: Object.assign({}, state.parameters, {
        [action.payload.key]: Object.assign({},state.parameters[action.payload.key], {
          value: action.payload.value
        })
      })
    });
  case SUBROUTINE_DONE:
    return Object.assign({}, state, {
      type: null,
      isFetching: false,
      error: null,
      parameters: {},
      success: state.type,
    });
  default:
    return state;
  }
};

export default reducer;
