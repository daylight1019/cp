// @flow

import {
  SYSTEM_SUCCESS,
  SYSTEM_REQUEST,
  SYSTEM_ERROR,
  ADD_SYSTEM_SUCCESS,
  ADD_SYSTEM_REQUEST,
  ADD_SYSTEM_ERROR,
  UPDATE_SYSTEM_SUCCESS,
  UPDATE_SYSTEM_REQUEST,
  UPDATE_SYSTEM_ERROR,
  ONE_SYSTEM_SUCCESS,
  ONE_SYSTEM_REQUEST,
  ONE_SYSTEM_ERROR,
} from '../constants/action-types';

const initialState = {
  systemsInfo: [],
  isLoading: false,
  error: false,
};

export const getSystemSelector = (state) => ({ ...state.systemReducer });

const systemReducer = (state = initialState, action:Object) => {
  switch (action.type) { 
    case SYSTEM_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        systemsInfo: JSON.parse(action.data),
      };
    }
    case SYSTEM_REQUEST: {
      return {
        isLoading: true,
        error: false,
        systemsInfo: {},
      };
    }
    case SYSTEM_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case ADD_SYSTEM_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        systemsInfo: state.systemsInfo.concat(JSON.parse(action.data)),
      };
    }
    case ADD_SYSTEM_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case ADD_SYSTEM_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case UPDATE_SYSTEM_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        systemsInfo: state.systemsInfo.map((item, index) => (item.id == JSON.parse(action.data).id ? JSON.parse(action.data) : item))
      };
    }
    case UPDATE_SYSTEM_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case UPDATE_SYSTEM_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case ONE_SYSTEM_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        systemsInfo: state.systemsInfo.map((item, index) => (item.id == JSON.parse(action.data).id ? JSON.parse(action.data) : item))
      };
    }
    case ONE_SYSTEM_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case ONE_SYSTEM_ERROR: {
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

export default systemReducer;
