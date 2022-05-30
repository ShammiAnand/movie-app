import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'
import { act } from 'react-dom/test-utils';

// MIDDLEWARE
// logger({ dispatch, getState })(next)(action)
/*
  if there are a chain of middlewares then next will point to the next middlware in the chain
 */
const logger = function ({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      // middleware code
      console.log('ACTION_TYPE = ', action.type);
      next(action);
    }
  }
}


const store = createStore(rootReducer, applyMiddleware(logger));
// console.log('store', store);

// store.dispatch({
//   type: 'ADD_MOVIES'
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* pass the redux store as props to the app */}
    <App store={store} />
  </React.StrictMode>
);

