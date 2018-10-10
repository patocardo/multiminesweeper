import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore,/* combineReducers*/ } from 'redux';
import reducer from './store/reducer';
// import { reducer as formReducer } from 'redux-form'

// const rootReducer = combineReducers({
//   config: reducer,
//   form: formReducer
// })

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App store={store}/></Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
