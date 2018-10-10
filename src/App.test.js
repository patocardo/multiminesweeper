import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';
import { connect } from 'react-redux';

const store = createStore(reducer);

it('renders without crashing', () => {
	const cnnApp = connect(state=>state)(App);
	const renderer = new ShallowRenderer();
	renderer.render(<Provider store={store}><cnnApp /></Provider>);
  const div = document.createElement('div');
  ReactDOM.unmountComponentAtNode(div);
});
