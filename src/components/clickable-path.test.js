/*eslint-env jest*/
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import ClickablePath from './clickable-path';

describe('ClickablePath', () => {
  describe('path="/operacoes"', () => {
    const chdir = jest.fn();
    const wrapper = mount(
      <ClickablePath
        path="/operacoes"
        chdir={chdir}
      />
    );
    it('has 1 children', () => {
      expect(wrapper.find('.path-btn').length).toBe(1);
    });
    it('text is /operacoes', () => {
      expect(wrapper.text()).toBe('/operacoes');
    });
  });
  let path = '/asdf:sd/we/';
  describe(`path="${path}"`, () => {
    const chdir = jest.fn();
    const wrapper = mount(
      <ClickablePath
        path={path}
        chdir={chdir}
      />
    );
    it('has 2 children', () => {
      expect(wrapper.find('.path-btn').length).toBe(2);
    });
    it(`text is ${path}`, () => {
      expect(wrapper.find('.path-btn').at(0).text()).toBe('asdf:sd');
      expect(wrapper.find('.path-btn').at(1).text()).toBe('we');
    });
  });
});
