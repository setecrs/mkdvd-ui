/*eslint-env jest*/

import { reducers, initialState } from '../reducers/index';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  getDirStart,
  getDirCancel,
  getDirDone,
  getDir,
} from './getdir';
import nock from 'nock';

describe('getDir', () => {
  it('getDirStart', () => {
    const store = createStore(
      combineReducers({
        ...reducers,
      }),
      applyMiddleware(thunk)
    );

    store.dispatch(getDirStart());
    const state = store.getState();
    expect(state).toEqual(Object.assign({},initialState,{
      getDir:{
        isFetching: true,
        error: null,
      }
    }));
  });
  it('getDirCancel', () => {
    const store = createStore(
      combineReducers({
        ...reducers,
      }),
      applyMiddleware(thunk)
    );

    store.dispatch(getDirStart());
    store.dispatch(getDirCancel('some error'));
    const state = store.getState();
    expect(state).toEqual(Object.assign({},initialState,{
      getDir:{
        isFetching: false,
        error: 'some error',
      }
    }));
  });
  it('getDirDone', () => {
    const store = createStore(
      combineReducers({
        ...reducers,
      }),
      applyMiddleware(thunk)
    );

    store.dispatch(getDirStart());
    store.dispatch(getDirDone({
      content: ['a','b','c'],
      subroutines: ['d', 'e'],
    }));
    const state = store.getState();
    expect(state).toEqual(Object.assign({},initialState,{
      getDir:{
        isFetching: false,
        error: null,
      },
      content: ['a','b','c'],
      subroutines: ['d', 'e'],
    }));
  });
  it('getDir', done => {
    process.env.REACT_APP_APIURL = process.env.REACT_APP_APIURL || "http://localhost"
    nock(process.env.REACT_APP_APIURL)
      .get('/v2/directory?path=%2F')
      .reply(200, {
        content: ['a','b','c'],
        subroutines: ['d', 'e'],
      });
    const store = createStore(
      combineReducers({
        ...reducers,
      }),
      applyMiddleware(thunk)
    );
    store.dispatch(getDir());
    store.subscribe(() => {
      const state = store.getState();
      expect(state).toEqual(Object.assign({},initialState,{
        getDir:{
          isFetching: false,
          error: null,
        },
        content: ['a','b','c'],
        subroutines: ['d', 'e'],
      }));
      done();
    });
  });
});
