import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { saveState, loadState } from './utils/persist';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers/index';
const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(createLogger(), promise())(createStore);
const store = createStoreWithMiddleware(reducers, persistedState);

store.subscribe(() => {
  saveState({
    navigation: store.getState().authenticationReducer.loggedIn
  });
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

registerServiceWorker();