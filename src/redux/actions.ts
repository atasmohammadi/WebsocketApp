import constants from './constants';

// action creators for handling socket activity
const actions = {
  onopen: () => ({type: constants.SOCKET_OPEN}),
  onclose: () => ({type: constants.SOCKET_CLOSE}),
  onerror: (err) => ({type: constants.SOCKET_ERROR, payload: err}),
  onmessage: (e) => ({
    type: constants.SOCKET_MESSAGE,
    payload: JSON.parse(e.data),
  }),
  socketConnect: () => ({type: constants.SOCKET_CONNECT}),
  socketDisconnect: () => ({type: constants.SOCKET_DISCONNECT}),
};

export default actions;
