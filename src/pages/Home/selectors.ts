import {createSelector} from 'reselect';
import {initialState} from './reducer';

/**
 * Direct selector to the Home state domain
 */

const selectHomeDomain = (state) => state.home || initialState;

/**
 * Other specific selectors
 */

const makeSelectList = () =>
  createSelector(selectHomeDomain, (subState) => subState.list);

const makeSelectError = () =>
  createSelector(selectHomeDomain, (subState) => subState.error);

const makeSelectStatus = () =>
  createSelector(selectHomeDomain, (subState) => subState.status);

/**
 * Default selector used by Home
 */

const makeSelectHome = () =>
  createSelector(selectHomeDomain, (subState) => subState);

export default makeSelectHome;
export {
  selectHomeDomain,
  makeSelectList,
  makeSelectError,
  makeSelectStatus,
};
