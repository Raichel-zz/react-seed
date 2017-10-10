import * as ActionTypes from './actions';
import paginate from 'app/reducers/paginate';

// Updates the pagination data for different actions.
const pagination = paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS.REQUEST,
      ActionTypes.STARGAZERS.SUCCESS,
      ActionTypes.STARGAZERS.FAILURE
    ]
  });

export default pagination;
