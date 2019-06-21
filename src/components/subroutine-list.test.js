/*eslint-env jest*/
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import SubroutineList from './subroutine-list';

describe('SubroutineList', () => {
  it('renders without crashing', () => {
    const subroutineClick = jest.fn();
    const chdir = jest.fn();
    mount(
      <SubroutineList
        path="/"
        subroutineClick={subroutineClick}
        subroutines={['mkDVD', 'test']}
      />
    );
  });
  describe('path="/operacoes"', () => {
    const subroutineClick = jest.fn();
    const chdir = jest.fn();
    const wrapper = mount(
      <SubroutineList
        path="/operacoes/"
        subroutineClick={subroutineClick}
        subroutines={['mkDVD', 'test']}
      />
    );
    it('text', () => {
      expect(wrapper.text()).toBe('mkDVD test ');
    });
    it('list contains mkdvd button', () => {
      expect(wrapper.containsMatchingElement(
        <button>mkDVD</button>
      )).toBe(true);
    });
    it('list contains 2 buttons', () => {
      expect(wrapper.find({type: 'button'}).length).toBe(2);
    });
    it('call subroutines', () => {
      wrapper.find('.subroutine-btn').first().simulate('click');
      expect(subroutineClick.mock.calls.length).toEqual(1);
    });
  });
});
