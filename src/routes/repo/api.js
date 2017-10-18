import { callApi, repoSchema, userSchemaArray } from '../api';

// api services
export const fetchRepo = fullName => callApi(`repos/${fullName}`, repoSchema);
export const fetchStargazers = url => callApi(url, userSchemaArray);
