// @flow

import {
  PATTERN_SUCCESS,
  PATTERN_REQUEST,
  PATTERN_ERROR,
  ADD_PATTERN_SUCCESS,
  ADD_PATTERN_REQUEST,
  ADD_PATTERN_ERROR,
  UPDATE_PATTERN_SUCCESS,
  UPDATE_PATTERN_REQUEST,
  UPDATE_PATTERN_ERROR,
} from '../constants/action-types';

const initialState = {
  patternsInfo: [],
  isLoading: false,
  error: false,
};

export const getPatternSelector = (state) => ({ ...state.patternReducer });

const patternReducer = (state = initialState, action:Object) => {
  switch (action.type) { 
    case PATTERN_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        patternsInfo: JSON.parse(action.data),
      };
    }
    case PATTERN_REQUEST: {
      return {
        isLoading: true,
        error: false,
        patternsInfo: {},
      };
    }
    case PATTERN_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case ADD_PATTERN_SUCCESS: {
      console.log("Add Success");
      return {
        isLoading: false,
        error: false,
        patternsInfo: state.patternsInfo.concat(JSON.parse(action.data)),
      };
    }
    case ADD_PATTERN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case ADD_PATTERN_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case UPDATE_PATTERN_SUCCESS: {
      console.log("UPDATE_PATTERN_SUCCESS", JSON.stringify(data));
      return {
        isLoading: false,
        error: false,
        patternsInfo: state.patternsInfo.map((item, index) => (item.id == data.id ? data : item))
      };
    }
    case UPDATE_PATTERN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case UPDATE_PATTERN_ERROR: {
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

export default patternReducer;
