import { action } from '../../actions';

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

export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER';

export const user = {
  request: ()=> action(USER[REQUEST]),
  success: (response) => action(USER[SUCCESS], {response}),
  failure: (error) => action(USER[FAILURE], {error}),
};

export const loadCurrentUser = () => action(LOAD_CURRENT_USER);
