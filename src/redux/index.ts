import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import {createSocketMiddleware} from './middlewares';
import {baseUrl, initialEvent} from '../constants';

const rootReducer = (state, action) => {
  let modifiedState = state;
  if (action.type.includes('LOGOUT')) {
    modifiedState = undefined;
  }
  return reducers(modifiedState, action);
};

export default function configureStore(initialState = {}) {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const socketMiddleware = createSocketMiddleware(baseUrl, initialEvent);

  const middlewares = [socketMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers),
  );

  return {store};
}
