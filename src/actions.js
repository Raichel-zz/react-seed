export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export const action = (type, payload = {}) => {
  return {type, ...payload};
};

export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE);
