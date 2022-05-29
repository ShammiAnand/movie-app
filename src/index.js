import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import rootReducer from './reducers'


const store = createStore(rootReducer);
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

