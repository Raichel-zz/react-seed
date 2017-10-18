import { callApi, userSchema } from '../api';

// api services
export const fetchUser = () => callApi(`current_user/`, userSchema);
