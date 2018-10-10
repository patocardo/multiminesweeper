import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../store/reducer';
import Players from '../components/Players';
//import {shuffle} from './shuffle-array';
// import { connect } from 'react-redux';

const store = createStore(reducer);

function shuffle(arr) {
  const oldArr = [...arr];
  const newArr = [];
  while(oldArr.length) {
    newArr.push(oldArr.splice(Math.round(Math.random() * oldArr.length - 1), 1)[0]);
  }
  return newArr;
}

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    addPlayer: jest.fn()
  }

  const enzymeWrapper = mount(<Provider store={store}><Players {...props} /></Provider>)

  return {
    props,
    enzymeWrapper
  }
}

describe('Players component', () => {
  it('should render players list for edit', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('Row').length).toBeGreaterThan(1);
  });

  it('should change player\'s name on input change', () => {
    const { enzymeWrapper } = setup();
    const inptName = enzymeWrapper.find('input[data-role="player-name"]').first();
    // const playerInStore = () => store.getState().players.filter((elm) => elm.id === parseInt(inptName.dataset.id));
    const nameToPost = shuffle(['ran', 'dom', ' ','sy', 'lla', 'bles']).join();
    // inptName.value = nameToPost;
    // inptName.simulate('blur');
    // const afterValue = playerInStore();
    // expect(afterValue.name).toBe(nameToPost);
  });

})
