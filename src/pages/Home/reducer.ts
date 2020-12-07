/*
 *
 * Home reducer
 *
 */

import produce from 'immer';
import {MESSAGE_RECEIVED, ERROR, OPEN, CLOSE} from './constants';
import type {Order} from './types';

interface InitialState {
  list: object;
  error: boolean | object;
  status: boolean;
}

export const initialState: InitialState = {
  list: {},
  error: false,
  status: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (
  state = initialState,
  action: {type: string; payload: string | Order},
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case OPEN:
        draft.status = true;
        break;
      case CLOSE:
        draft.status = false;
        break;
      case ERROR:
        draft.error = action.payload;
        break;
      case MESSAGE_RECEIVED:
        if (
          typeof action.payload === 'object' &&
          action.payload.qty && action.payload.price
        ) {
          draft.list[action.payload.qty] = action.payload;
          draft.error = false;
        }
        break;
    }
  });

export default homeReducer;
