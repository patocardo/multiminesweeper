import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../store/reducer';
import InitialConf from '../components/InitialConf';
// import { connect } from 'react-redux';

const store = createStore(reducer);

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    doStart: jest.fn()
  }

  const enzymeWrapper = mount(<Provider store={store}><InitialConf {...props} /></Provider>)

  return {
    props,
    enzymeWrapper
  }
}

describe('InitialConf if the game didn\'t start', () => {
	if(!store.getState().started) {
    it('should render initial configuration', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('div').first().is('.initial-conf')).toBe(true);
      expect(enzymeWrapper.find('div').first().find('[data-role="starter"]').length).toBeGreaterThanOrEqual(1)
      // const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
      // expect(todoInputProps.newTodo).toBe(true)
      // expect(todoInputProps.placeholder).toEqual('What needs to be done?')
    });

    it('should change difficulty level', () => {
      const { enzymeWrapper } = setup();
      const btnLevel = enzymeWrapper.find('[data-role="level-changer"]').first().find('.btn-secondary').first();
      var currLevel = store.getState().level;
      btnLevel.simulate('click');
      expect(store.getState().level).not.toBe(currLevel);
    });

    it('should hide initial configuration', () => {
      const { enzymeWrapper } = setup();
      const btnStart = enzymeWrapper.find('[data-role="starter"]').first();
      btnStart.simulate('click');
      expect(store.getState().started).toBe(true)
    });
  }
})
