import {bindActionCreators} from 'redux';
import types from './constants';
import actions from './actions';

// a predicate function to know when to connect to socket
const shouldInstantiate = action => action.type === types.SOCKET_CONNECT

// a predicate function to know when to disconnect to socket
const shouldDisconnect = action => action.type === types.SOCKET_DISCONNECT


let ws: WebSocket;

// Here we write the function for creating our middleware
// Let's break down these arguments...
export const createSocketMiddleware = (
  socketURL, // the url our socket connects to
  subscribeData, // the handshake data our socket will send once connected (optional)
) => (store) => (next) => (action) => {
  if (shouldInstantiate(action)) {
    // instantiate the web socket
    ws = new WebSocket(socketURL);
    // bind eventHandlers to dispatch
    const boundEventHandlers = bindActionCreators(
      actions,
      store.dispatch,
    );
    // fire onopen event, and fire off a subscribe message with our handshake data
    ws.onopen = (e) => {
      boundEventHandlers.onopen(e);
      ws.send(JSON.stringify(subscribeData));
    };
    // assign remaining event handlers
    ws.onclose = boundEventHandlers.onclose;
    ws.onerror = boundEventHandlers.onerror;
    ws.onmessage = boundEventHandlers.onmessage;
  } else if(shouldDisconnect(action) && ws) {
    ws.close()
  } else {
    return next(action);
  }
};
