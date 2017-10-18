import * as ActionTypes from './actions';
import { paginate } from '../../reducers/paginate';
//
// // Updates the pagination data for different actions.
// const pagination = paginate({
//     mapActionToKey: action => action.login,
//     types: [
//       ActionTypes.STARRED.REQUEST,
//       ActionTypes.STARRED.SUCCESS,
//       ActionTypes.STARRED.FAILURE
//     ]
//   });

// Updates error message to notify about the failed fetches.
export const currentUser = (state = null, action) => {
  const { type, response } = action;
  if (type === ActionTypes.USER.SUCCESS) {
    return response.entities.currentUser[response.result];
  }
  return state;
};

// export default pagination;
