/*eslint-env jest*/
import { reducers, initialState } from './index';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

describe('rootReducer', () => {
  it('initialState', done => {
    const store = createStore(
      combineReducers({...reducers}),
      applyMiddleware(thunk)
    );

    const state = store.getState();
    expect(state).toEqual(initialState);
    done();
  });
});
