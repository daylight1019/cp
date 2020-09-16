// @flow

import {
  INGREDIENT_SUCCESS,
  INGREDIENT_REQUEST,
  INGREDIENT_ERROR,
  ONE_INGREDIENT_SUCCESS,
  ADD_INGREDIENT_SUCCESS,
  ADD_INGREDIENT_REQUEST,
  ADD_INGREDIENT_ERROR,
  UPDATE_INGREDIENT_SUCCESS,
  UPDATE_INGREDIENT_REQUEST,
  UPDATE_INGREDIENT_ERROR,
} from '../constants/action-types';

const initialState = {
  ingredientsInfo: [],
  isLoading: false,
  error: false,
};

export const getIngredientSelector = (state) => ({ ...state.ingredientReducer });

const ingredientReducer = (state = initialState, action: Object) => {
  if (action.data == undefined) return state;
  var parseData = JSON.parse(action.data);
  switch (action.type) {
    case INGREDIENT_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        ingredientsInfo: parseData,
      };
    }
    case INGREDIENT_REQUEST: {
      return {
        isLoading: true,
        error: false,
        ingredientsInfo: {},
      };
    }
    case INGREDIENT_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case ONE_INGREDIENT_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        ingredientsInfo: state.ingredientsInfo.map(x => x.id == parseData.id ? parseData : x),
      };
    }
    case ADD_INGREDIENT_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        ingredientsInfo: state.ingredientsInfo.concat(parseData),
      };
    }
    case ADD_INGREDIENT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case ADD_INGREDIENT_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case UPDATE_INGREDIENT_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        ingredientsInfo: state.ingredientsInfo.map(x => x.id == (parseData.id) ? parseData : x),
      };
    }
    case UPDATE_INGREDIENT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case UPDATE_INGREDIENT_ERROR: {
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

export default ingredientReducer;
