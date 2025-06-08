import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USER_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
  USERS_LOADED,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAIL,
  CLEAR_DATA,
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case USERS_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        users: action.payload,
      };
    case USER_REGISTER_REQUEST:
    case USER_LOGIN_REQUEST:
      return { isLoading: true };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', action.payload._id);
      console.log('action.payload', action.payload);

      return {
        ...state,
        ...action.payload,
        userId: action.payload._id,
        isAuthenticated: true,
        isLoading: false,
      };
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case CLEAR_DATA:
      return {
        ...state,
        data: null,
        isLoading: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        users: null,
        error: action.payload,
      };

    case ADD_CARD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
