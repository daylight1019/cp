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

  UPDATE_LEAD_SUCCESS,
  UPDATE_PERSON_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_PHONE_SUCCESS,
  UPDATE_LEADDETAIL_SUCCESS,
} from '../constants/action-types';

const initialState = {
  leadsInfo: [],
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
        isLoading: false,
        error: false,
        leadsInfo: parseData,
      };
    }
    case LEAD_REQUEST: {
      return {
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
      return {
        isLoading: false,
        error: false,
        oneLeadInfo: parseData,
        leadsInfo: state.leadsInfo
      };
    }
    case ADD_LEAD_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        // leadsInfo: state.leadsInfo.map(lead=>(lead.person.id==parseData.personid?{...lead,lead:parseData}:lead)),
        leadsInfo: state.leadsInfo.concat({ person: parseData }),
      };
    }
    case ADD_PERSON_SUCCESS: {
      console.log("HERE is ADD PERSON SUCCESS", JSON.stringify(state.leadsInfo));
      console.log("PERSON DATA", action.data)
      return {
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.concat({ person: parseData }),
      };
    }
    case ADD_PHONE_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.id == parseData.personid ? { ...lead, phone: parseData } : lead))
      };
    }
    case ADD_ADDRESS_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.id == parseData.personid ? { ...lead, address: parseData } : lead))
      };
    }
    case ADD_LEADDETAIL_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.id == parseData.personid ? { ...lead, leaddetail: parseData } : lead)),
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
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead=>(lead.person.id==parseData.personid?{...lead,lead:parseData}:lead)),
        // leadsInfo: state.leadsInfo.concat({ person: parseData }),
      };
    }
    case UPDATE_PERSON_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead=>(lead.person.id==parseData.personid?{...lead,person:parseData}:lead)),
        // leadsInfo: state.leadsInfo.concat({ person: parseData }),
      };
    }
    case UPDATE_PHONE_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.id == parseData.personid ? { ...lead, phone: parseData } : lead))
      };
    }
    case UPDATE_ADDRESS_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.id == parseData.personid ? { ...lead, address: parseData } : lead))
      };
    }
    case UPDATE_LEADDETAIL_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        leadsInfo: state.leadsInfo.map(lead => (lead.person.id == parseData.personid ? { ...lead, leaddetail: parseData } : lead)),
      };
    }
    default: {
      return state;
    }
  }
};

export default leadReducer;
