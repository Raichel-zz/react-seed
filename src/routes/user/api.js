import { callApi, userSchema, repoSchemaArray } from '../services/api';

// api services
export const fetchUser = login => callApi(`users/${login}`, userSchema);
export const fetchStarred = url => callApi(url, repoSchemaArray);
