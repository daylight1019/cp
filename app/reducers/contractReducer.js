// @flow

import {
  CONTRACT_SUCCESS,
  CONTRACT_REQUEST,
  CONTRACT_ERROR,
  ADD_CONTRACT_SUCCESS,
  ADD_CONTRACT_REQUEST,
  ADD_CONTRACT_ERROR
} from '../constants/action-types';

const initialState = {
  contractsInfo: [],
  isLoading: false,
  error: false,
};

export const getContractSelector = (state) => ({ ...state.contractReducer });

const contractReducer = (state = initialState, action:Object) => {
  switch (action.type) { 
    case CONTRACT_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        contractsInfo: JSON.parse(action.data),
      };
    }
    case CONTRACT_REQUEST: {
      return {
        isLoading: true,
        error: false,
        contractsInfo: {},
      };
    }
    case CONTRACT_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case ADD_CONTRACT_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        contractsInfo: state.contractsInfo.concat(JSON.parse(action.data))
      };
    }
    case ADD_CONTRACT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case ADD_CONTRACT_ERROR: {
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

export default contractReducer;
