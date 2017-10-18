import * as ActionTypes from './actions';

// Updates error message to notify about the failed fetches.
export const currentUser = (state = null, action) => {
  const { type, response } = action;
  if (type === ActionTypes.USER.SUCCESS) {
    return response.entities.currentUser[response.result];
  }
  return state;
};
