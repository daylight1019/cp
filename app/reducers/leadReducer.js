// @flow

import {
  LEAD_SUCCESS,
  LEAD_REQUEST,
  LEAD_ERROR,
  ADD_LEAD_SUCCESS,
  ONE_LEAD_SUCCESS,
  ADD_PERSON_SUCCESS,
  ADD_ADDRESS_SUCCESS,
  ADD_PHONE_SUCCESS,
  ADD_LEADDETAIL_SUCCESS,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  ADD_PROJECTDETAIL_SUCCESS,
  ADD_PROJECTDETAIL_ERROR,

  PROJECTDETAIL_SUCCESS,
  PROJECT_SUCCESS,
  STATE_SUCCESS,

  UPDATE_LEAD_SUCCESS,
  UPDATE_PERSON_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_PHONE_SUCCESS,
  UPDATE_LEADDETAIL_SUCCESS
} from '../constants/action-types';

const initialState = {
  leadsInfo: [],
  statesInfo: [],
  oneLeadInfo: {},
  isLoading: false,
  error: false
};

export const getLeadSelector = (state) => ({ ...state.leadReducer });

const leadReducer = (state = initialState, action: Object) => {
  if (action.data == undefined) return state;
  var parseData = JSON.parse(action.data);
  switch (action.type) {
    case LEAD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        leadsInfo: parseData,
      };
    }
    case LEAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        leadsInfo: {},
      };
    }
    case LEAD_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case ONE_LEAD_SUCCESS: {
      console.log(ONE_LEAD_SUCCESS, action.data)
      return {
        ...state,
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => lead.id == parseData.lead.id ? { ...parseData, id: lead.id } : lead)
      };
    }
    case ADD_LEAD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.concat({ person: parseData, active: true }),
      };
    }
    case ADD_PERSON_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.concat({ person: parseData, active: true }),
      };
    }
    case ADD_PHONE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.id == parseData.personid ? { ...lead, phone: parseData } : lead))
      };
    }
    case ADD_ADDRESS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.id == parseData.personid ? { ...lead, address: parseData } : lead))
      };
    }
    case ADD_LEADDETAIL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.leadid == parseData.leadid ? { ...lead, leaddetail: parseData } : lead)),
      };
    }
    case ADD_PROJECT_SUCCESS: {
      return {
        ...state,
        projectId: parseData.id,
        addProjectResult: true
      };
    }
    case ADD_PROJECT_ERROR: {
      return {
        ...state,
        projectId: '',
        addProjectResult: false
      };
    }
    case ADD_PROJECTDETAIL_SUCCESS: {
      return {
        ...state,
        addProjectDetailResult: true
      };
    }
    case ADD_PROJECTDETAIL_ERROR: {
      return {
        ...state,
        addProjectDetailResult: false
      };
    }
    case UPDATE_LEAD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.id == parseData.id ? { ...lead, active: parseData.active } : lead)),
      };
    }
    case UPDATE_PERSON_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.id == parseData.id ? { ...lead, person: parseData } : lead)),
      };
    }
    case UPDATE_PHONE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.id == parseData.personid ? { ...lead, phone: parseData } : lead))
      };
    }
    case UPDATE_ADDRESS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.id == parseData.personid ? { ...lead, address: parseData } : lead))
      };
    }
    case UPDATE_LEADDETAIL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.id == parseData.personid ? { ...lead, leaddetail: parseData } : lead)),
      };
    }
    case STATE_SUCCESS: {
      return {
        ...state,
        statesInfo: parseData
      };
    }
    default: {
      return state;
    }
  }
};

export default leadReducer;
