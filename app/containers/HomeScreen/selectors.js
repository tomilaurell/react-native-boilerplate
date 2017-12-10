/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('Home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

export {
  selectHome,
  makeSelectUsername,
};
