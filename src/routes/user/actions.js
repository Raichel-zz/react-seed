import { action } from 'actions';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const USER = createRequestTypes('USER');
export const STARRED = createRequestTypes('STARRED');

export const LOAD_USER_PAGE = 'LOAD_USER_PAGE';
export const LOAD_MORE_STARRED = 'LOAD_MORE_STARRED';

export const user = {
  request: login => action(USER[REQUEST], {login}),
  success: (login, response) => action(USER[SUCCESS], {login, response}),
  failure: (login, error) => action(USER[FAILURE], {login, error}),
};

export const starred = {
  request: login => action(STARRED[REQUEST], {login}),
  success: (login, response) => action(STARRED[SUCCESS], {login, response}),
  failure: (login, error) => action(STARRED[FAILURE], {login, error}),
};

export const loadUserPage = (login, requiredFields = []) => action(LOAD_USER_PAGE, {login, requiredFields});
export const loadMoreStarred = login => action(LOAD_MORE_STARRED, {login});
