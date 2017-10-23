import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import * as constants from '../constants';
import Cookie from 'js-cookie';
import 'isomorphic-fetch';

const setCSRFToken = (req) => {
  if (req.method === 'GET') {
    return req;
  }
  const csrfToken = Cookie.get('csrftoken_pipl_bi');
  if (csrfToken) {
    req.headers['X-CSRFTOKEN'] = csrfToken;
  }
  return req;
};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export const callApi = (endpoint, schema) => {
  const fullUrl = (endpoint.indexOf(constants.API_ROOT) === -1) ? constants.API_ROOT + endpoint : endpoint;
  let req = {
    credentials: 'include',
    headers: {}
  };
  req = setCSRFToken(req);
  return fetch(fullUrl, req)
    .then(response => {
          console.log(response);
          if (response.status === 401) { //Unauthorized
            // window.location = `${constants.PIPL_ACCOUNTS_URL}/login/?next=${window.location.href}`;
            window.location = `${constants.API_ROOT}login/pipl/?next=/`;
          } else {
            return response.json().then(json => ({json, response}));

          }
        }
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      const camelizedJson = camelizeKeys(json);
      if(schema) {
        return Object.assign({},
            normalize(camelizedJson, schema)
        );
      } else {
        return Object.assign({}, camelizedJson);
      }
    })
    .then(
        response => ({response}),
        error => ({error: error.message || 'Something bad happened'})
    );
};
