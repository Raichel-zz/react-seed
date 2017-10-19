import * as ActionTypes from './actions';

//TODO: seamless-immutable
// Updates error message to notify about the failed fetches.
export const currentUser = (state = null, action) => {
  const { type, response } = action;
  if (type === ActionTypes.USER.SUCCESS) {
    return Object.assign({}, state, response);
  }
  return state;
};
