import * as ActionTypes from './actions';

// Updates error message to notify about the failed fetches.
export const insights = (state = null, action) => {
  const { type, response } = action;
  if (type === ActionTypes.INSIGHTS.SUCCESS) {
    return response.entities.insights;
  }
  return state;
};
