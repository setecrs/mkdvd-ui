import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import { chdir } from './actions';

import createHistory from 'history/createBrowserHistory';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import AppContainer from './containers/app-container';
// import registerServiceWorker from './registerServiceWorker';

const history = createHistory();

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(thunk, routerMiddleware(history))
);

history.listen(location => store.dispatch(chdir(location.pathname)));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Redirect exact from="/" to="/operacoes"/>
        <Route path="/" component={AppContainer} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

//registerServiceWorker();
