import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// import { createStore } from 'redux';
import { Provider } from 'react-redux'
// import { todoReducer } from './redux/reducers/todoReducer'
// import { StoreState } from 'redux/types/todo/types';
import store from 'redux/store/store';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// const todoStore = createStore();

const container = document.getElementById('root');

if ( container ) {
  const root = createRoot(container);
  root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
}