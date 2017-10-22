import * as ActionTypes from './actions';

// gets the current logged in user.
export const currentUser = (state = null, action) => {
  const { type, response } = action;
  if (type === ActionTypes.USER.SUCCESS) {
    return Object.assign({}, state, response);
  }
  return state;
};
