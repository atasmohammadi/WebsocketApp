/**
 * Websocket App
 * Higher Order Component
 * Configures the Redux Store
 */

import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux';
import App from './pages';

// Create redux store
const initialState = {};
const { store } = configureStore(initialState);

const HOC = (): React.ReactNode => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default HOC;
