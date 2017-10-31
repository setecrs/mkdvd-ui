/*eslint-env jest*/
import rootReducer, { initialState } from './index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

describe('rootReducer', () => {
  it('initialState', done => {
    const store = createStore(
      rootReducer,
      applyMiddleware(thunk)
    );

    const state = store.getState();
    expect(state).toEqual(initialState);
    done();
  });
});
