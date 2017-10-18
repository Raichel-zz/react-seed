import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import { currentUser } from '../routes/user/reducers';
// import stargazersByRepo from '../routes/repo/reducers';

// Updates an entity cache in response to any action with response.entities.
// const entities = (state = { users: {}, repos: {} }, action) => {
//   if (action.response && action.response.entities) {
//     return merge({}, state, action.response.entities);
//   }
//   return state;
// };

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
};

// const pagination = combineReducers({
//   stargazersByRepo,
// });

const rootReducer = combineReducers({
  // entities,
  // pagination,
  errorMessage,
  currentUser
});

export default rootReducer;
