import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
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
  USERS_LOADED,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAIL,
  ADD_SIGNATURE_SUCCESS,
  ADD_SIGNATURE_FAIL,
  CLEAR_DATA,
} from '../types';

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
const AuthState = (props) => {
  const initialState = {
    token,
    isAuthenticated: token !== null,
    isLoading: false,
    error: null,
    userId,
    users: null,
    user: null,
    data: {},
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async (id) => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(`/api/users/${id}`);

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  const loadAllUsers = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(`/api/users`);
      dispatch({
        type: USERS_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  // Add Card
  const addCard = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        `api/users/${userId}/card`,
        formData,
        config
      );

      dispatch({
        type: ADD_CARD_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ADD_CARD_FAIL,
        payload: err.response.data.message,
      });
    }
  };
  // Add Signature
  const addSignature = async (formData, cardId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const dataBody = {
      ellipticType: formData,
    };
    console.log(formData, typeof cardId);
    try {
      const res = await axios.post(
        `api/users/${userId}/cards/${cardId}`,
        dataBody,
        config
      );

      dispatch({
        type: ADD_SIGNATURE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ADD_SIGNATURE_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      const res = await axios.post('/api/users/login', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res?.data,
      });

      // loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response?.data.message,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  const clearData = () => dispatch({ type: CLEAR_DATA });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        users: state.users,
        user: state.user,
        userId: state.userId,
        error: state.error,
        data: state.data,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        loadAllUsers,
        addCard,
        addSignature,
        clearData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
