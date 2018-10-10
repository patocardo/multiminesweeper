import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../store/reducer';
import MainBoard from '../components/MainBoard';
// import { connect } from 'react-redux';

const store = createStore(reducer);

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    started: true
  }

  const enzymeWrapper = mount(<Provider store={store}><MainBoard {...props} /></Provider>)

  return {
    props,
    enzymeWrapper
  }
}

describe('MainBoard', () => {
  it('should render main board', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find('Button').length).toBeGreaterThanOrEqual(2);
  });

  // it('should change difficulty level', () => {
  //   const { enzymeWrapper } = setup();
  //   const btnLevel = enzymeWrapper.find('[data-role="level-changer"]').first().find('.btn-secondary').first();
  //   var currLevel = store.getState().level;
  //   btnLevel.simulate('click');
  //   expect(store.getState().level).not.toBe(currLevel);
  // });

  // it('should hide initial configuration', () => {
  //   const { enzymeWrapper } = setup();
  //   const btnStart = enzymeWrapper.find('[data-role="starter"]').first();
  //   btnStart.simulate('click');
  //   expect(store.getState().started).toBe(true)
  // });
})
