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

  CALENDAR_SUCCESS,
  UPDATE_CALENDAR_SUCCESS,
  ADD_CALENDAR_SUCCESS,
  DELETE_CALENDAR_SUCCESS,
} from '../constants/action-types';

const initialState = {
  systemsInfo: [],
  isLoading: false,
  error: false,
};

export const getSystemSelector = (state) => ({ ...state.systemReducer });

const systemReducer = (state = initialState, action: Object) => {
  var parseData;

  if (action.data != undefined)
    parseData = JSON.parse(action.data)

  switch (action.type) {
    case SYSTEM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        systemsInfo: parseData,
      };
    }
    case SYSTEM_REQUEST: {
      return {
        ...state,
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
        ...state,
        isLoading: false,
        error: false,
        systemsInfo: state.systemsInfo.concat(parseData),
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
        ...state,
        isLoading: false,
        error: false,
        systemsInfo: state.systemsInfo.map((item, index) => (item.id == parseData.id ? parseData : item))
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
        ...state,
        isLoading: false,
        error: false,
        systemsInfo: state.systemsInfo.map((item, index) => (item.id == parseData.id ? parseData : item))
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
    case CALENDAR_SUCCESS: {
      return {
        ...state,
        calendarInfo: parseData,
        isLoading: true,
        error: false,
      };
    }
    case ADD_CALENDAR_SUCCESS: {
      return {
        ...state,
        calendarInfo: state.calendarInfo.concat(parseData),
        isLoading: true,
        error: false,
      };
    }
    case UPDATE_CALENDAR_SUCCESS: {
      return {
        ...state,
        calendarInfo: state.calendarInfo.map(x => x.id == parseData.id ? parseData : x),
        isLoading: true,
        error: false,
      };
    }
    case DELETE_CALENDAR_SUCCESS: {
      return {
        ...state,
        calendarInfo: state.calendarInfo.filter(x => x.id != parseData.id),
        isLoading: true,
        error: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default systemReducer;
