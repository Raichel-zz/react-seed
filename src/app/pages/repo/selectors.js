
export const getRepo = (state, fullName) => state.entities.repos[fullName];
export const getStargazersByRepo = (state, fullName) => state.pagination.stargazersByRepo[fullName] || {};
