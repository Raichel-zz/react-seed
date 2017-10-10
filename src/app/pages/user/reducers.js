import * as ActionTypes from './actions';
import paginate from 'app/reducers/paginate';

// Updates the pagination data for different actions.
const pagination = paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED.REQUEST,
      ActionTypes.STARRED.SUCCESS,
      ActionTypes.STARRED.FAILURE
    ]
  });

export default pagination;
