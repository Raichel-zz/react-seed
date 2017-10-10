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

export const REPO = createRequestTypes('REPO');
export const STARGAZERS = createRequestTypes('STARGAZER');

export const LOAD_REPO_PAGE = 'LOAD_REPO_PAGE';
export const LOAD_MORE_STARGAZERS = 'LOAD_MORE_STARGAZERS';

export const repo = {
  request: fullName => action(REPO[REQUEST], {fullName}),
  success: (fullName, response) => action(REPO[SUCCESS], {fullName, response}),
  failure: (fullName, error) => action(REPO[FAILURE], {fullName, error}),
};

export const stargazers = {
  request: fullName => action(STARGAZERS[REQUEST], {fullName}),
  success: (fullName, response) => action(STARGAZERS[SUCCESS], {fullName, response}),
  failure: (fullName, error) => action(STARGAZERS[FAILURE], {fullName, error}),
};

export const loadRepoPage = (fullName, requiredFields = []) => action(LOAD_REPO_PAGE, {fullName, requiredFields});
export const loadMoreStargazers = fullName => action(LOAD_MORE_STARGAZERS, {fullName});
