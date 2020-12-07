/*
 *
 * Home actions
 *
 */

import socketActions from '../../redux/actions';

export const ordersSubscribe = socketActions.socketConnect;
export const ordersUnsubscribe = socketActions.socketDisconnect;
