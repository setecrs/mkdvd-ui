/*eslint-env jest*/
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import AppContainer from './app-container';
import { initialState } from '../reducers';

const mockStore = configureStore([thunk]);

describe('AppContainer', () => {
  it('renders without crashing', () => {
    const store = mockStore(initialState);
    mount(<Provider store={store}>
      <AppContainer />
    </Provider>);
  });
  it('does not show error if there is none', () => {
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}>
      <AppContainer />
    </Provider>);
    expect(wrapper.find('.errorMessage').length).toBe(0);
  });
  it('show both error messages when there is an error in getDir and subroutine', () => {
    const store = mockStore(Object.assign({}, initialState, {
      getDir: {
        error: JSON.stringify({message: 'getDir Error 1'}),
      },
      subroutine: {
        error: JSON.stringify({message: 'subroutine Error 2'}),
      },
    }));
    const wrapper = mount(<Provider store={store}>
      <AppContainer />
    </Provider>);
    expect(wrapper.find('.errorMessage').length).toBe(2);
  });
});
