// @flow

import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_ERROR
} from '../constants/action-types';

const initialState = {
  userInfo: [],
  isLoading: false,
  error: false,
};

export const getLoginSelector = (state) => ({ ...state.leads });

const loginReducer = (state = initialState, action:Object) => {
  switch (action.type) { 
    case LOGIN_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        userInfo: action.data
      };
    }
    case LOGIN_REQUEST: {
      return {
        isLoading: true,
        error: false,
        userInfo: {},
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
