export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const createRequestTypes = (base) => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
};

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export const action = (type, payload = {}) => {
  return {type, ...payload};
};

export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE);
