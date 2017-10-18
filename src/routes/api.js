import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import Cookie from 'js-cookie';
import 'isomorphic-fetch';

const API_ROOT = 'http://localhost:8000/';

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
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  let req = {
    credentials: 'include',
    headers: {}
  };
  req = setCSRFToken(req);
  return fetch(fullUrl, req)
    .then(response =>
        response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      const camelizedJson = camelizeKeys(json);
      return Object.assign({},
          normalize(camelizedJson, schema)
      );
    })
    .then(
        response => ({response}),
        error => ({error: error.message || 'Something bad happened'})
    );
};
