import { LOGIN } from '../constants';

const initState = {
  user: {},
  token: '',
  roles: '', 
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      const { user } = action.payload;
      const authToken = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');
      console.log("authToken", authToken)
      return {
        ...state,
        user: user,
        token: authToken,
        refreshToken: refreshToken,
        roles: user?.role, 
      };
    default:
      return state;
  }
};

export default auth;
