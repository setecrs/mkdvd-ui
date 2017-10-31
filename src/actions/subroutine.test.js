/*eslint-env jest*/

import rootReducer, { initialState } from '../reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  subroutineStart,
  subroutineCancel,
  subroutineDone,
  subroutine,
  subroutineParameters,
  subroutineSetParameter,
} from './subroutine';
import nock from 'nock';

describe('subroutine', () => {
  it('subroutineStart', () => {
    const store = createStore(
      rootReducer,
      applyMiddleware(thunk)
    );

    store.dispatch(subroutineStart('mkDVD'));
    const state = store.getState();
    expect(state).toEqual(Object.assign({},initialState,{
      subroutine:{
        type: 'mkDVD',
        isFetching: true,
        error: null,
        parameters: {},
        success: null,
      }
    }));
  });
  it('subroutineCancel', () => {
    const store = createStore(
      rootReducer,
      applyMiddleware(thunk)
    );

    store.dispatch(subroutineStart('mkDVD'));
    store.dispatch(subroutineCancel('some error'));
    const state = store.getState();
    expect(state).toEqual(Object.assign({},initialState,{
      subroutine:{
        type: 'mkDVD',
        isFetching: false,
        error: 'some error',
        parameters: {},
        success: null,
      }
    }));
  });
  it('subroutineDone', () => {
    const store = createStore(
      rootReducer,
      applyMiddleware(thunk)
    );

    store.dispatch(subroutineStart('mkDVD'));
    store.dispatch(subroutineDone());
    const state = store.getState();
    expect(state).toEqual(Object.assign({},initialState,{
      subroutine:{
        success: 'mkDVD',
        type: null,
        isFetching: false,
        error: null,
        parameters: {}
      },
    }));
  });
  it('subroutine', done => {
    nock(process.env.REACT_APP_APIURL)
      .post('/v2/directory', {
        action: 'mkDVD',
        path: '/operacoes/'
      })
      .reply(200);
    const store = createStore(
      rootReducer,
      applyMiddleware(thunk)
    );
    store.dispatch(subroutine('mkDVD'));
    store.subscribe(() => {
      const state = store.getState();
      expect(state).toEqual(Object.assign({},initialState,{
        subroutine:{
          type: null,
          success: 'mkDVD',
          isFetching: false,
          error: null,
          parameters: {}
        },
      }));
      done();
    });
  });
  it('subroutine with 400', done => {
    nock(process.env.REACT_APP_APIURL)
      .post('/v2/directory', {
        action: 'mv',
        path: '/operacoes/'
      })
      .reply(400, {
        parameters: {
          material: {
            type:  'number',
            error: 'required'
          },
          path:{
            type: 'string',
            hidden: true,
            value:'/operacoes'
          }
        }
      });
    const store = createStore(
      rootReducer,
      applyMiddleware(thunk)
    );
    store.dispatch(subroutine('mv'));
    store.subscribe(() => {
      const state = store.getState();
      expect(state).toEqual(Object.assign({},initialState,{
        subroutine:{
          type: 'mv',
          success: null,
          isFetching: false,
          error: null,
          parameters:{
            material: {
              type:  'number',
              error: 'required'
            },
            path:{
              type: 'string',
              hidden: true,
              value:'/operacoes'
            }
          }
        },
      }));
      done();
    });
  });
  it('subroutineParameters', done => {
    const store = createStore(
      rootReducer,
      applyMiddleware(thunk)
    );
    store.dispatch(subroutineStart('mv'));
    store.dispatch(subroutineParameters({
      material: {
        type:  'number',
        error: 'required'
      },
      path:{
        type: 'string',
        hidden: true,
        value:'/operacoes'
      }
    }));
    store.subscribe(() => {
      const state = store.getState();
      expect(state).toEqual(Object.assign({},initialState,{
        subroutine:{
          type: 'mv',
          success: null,
          isFetching: false,
          error: null,
          parameters:{
            material: {
              type:  'string',
              error: 'not found'
            },
            test:{
              type: 'number',
              hidden: true,
              value: 2
            },
          }
        },
      }));
      done();
    });
    store.dispatch(subroutineParameters({
      material: {
        type:  'string',
        error: 'not found'
      },
      test:{
        type: 'number',
        hidden: true,
        value: 2
      }
    }));
  });
  it('subroutineSetParameter', done => {
    const store = createStore(
      rootReducer,
      applyMiddleware(thunk)
    );
    store.dispatch(subroutineStart('mv'));
    store.dispatch(subroutineParameters({
      material: {
        type:  'number',
        error: 'required'
      },
      path:{
        type: 'string',
        hidden: true,
        value:'/operacoes'
      }
    }));
    store.dispatch(subroutineSetParameter('material', 2));
    const state = store.getState();
    expect(state).toEqual(Object.assign({},initialState,{
      subroutine:{
        type: 'mv',
        success: null,
        isFetching: false,
        error: null,
        parameters:{
          material: {
            value: 2,
            type:  'number',
            error: 'required'
          },
          path:{
            type: 'string',
            hidden: true,
            value:'/operacoes'
          }
        }
      },
    }));
    done();
  });
  it('subroutineDone erase parameters', done => {
    const store = createStore(
      rootReducer,
      applyMiddleware(thunk)
    );
    store.dispatch(subroutineStart('mv'));
    store.dispatch(subroutineParameters({
      material: {
        type:  'string',
        error: 'not found'
      },
      path:{
        type: 'string',
        hidden: true,
        value:'/operacoes'
      }
    }));
    store.dispatch(subroutineDone());
    const state = store.getState();
    expect(state).toEqual(Object.assign({},initialState, {
      subroutine: {
        type: null,
        success: 'mv',
        isFetching: false,
        error: null,
        parameters:{}
      }
    }));
    done();
  });
});
