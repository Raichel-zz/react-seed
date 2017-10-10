
export const getUser = (state, login) => state.entities.users[login];
export const getStarredByUser = (state, login) => state.pagination.starredByUser[login] || {};
