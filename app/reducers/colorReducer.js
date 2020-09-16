// @flow

import {
  COLOR_SUCCESS,
  COLOR_REQUEST,
  COLOR_ERROR,
  ADD_COLOR_SUCCESS,
  ADD_COLOR_REQUEST,
  ADD_COLOR_ERROR,
  UPDATE_COLOR_SUCCESS,
  UPDATE_COLOR_REQUEST,
  UPDATE_COLOR_ERROR,
  DELETE_COLOR_SUCCESS,
  DELETE_COLOR_REQUEST,
  DELETE_COLOR_ERROR,
} from '../constants/action-types';

const initialState = {
  colorsInfo: [],
  isLoading: false,
  error: false,
};

export const getColorSelector = (state) => ({ ...state.colorReducer });

const colorReducer = (state = initialState, action) => {
  var data;
  if(action.data!= undefined)
    data = JSON.parse(action.data)
  switch (action.type) {
    case COLOR_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        colorsInfo: data,
      };
    }
    case COLOR_REQUEST: {
      return {
        isLoading: true,
        error: false,
        colorsInfo: {},
      };
    }
    case COLOR_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case ADD_COLOR_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        colorsInfo: state.colorsInfo.concat(data)
      };
    }
    case ADD_COLOR_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case ADD_COLOR_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    }
    case UPDATE_COLOR_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        colorsInfo: state.colorsInfo.map(item => (item.id == data.id ? data : item))
      };
    }
    case UPDATE_COLOR_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case UPDATE_COLOR_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    }
    case DELETE_COLOR_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        colorsInfo: state.colorsInfo.filter(item => item.id == data.id)
      };
    }
    case DELETE_COLOR_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case DELETE_COLOR_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default colorReducer;
