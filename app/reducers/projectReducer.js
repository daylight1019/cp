// @flow

import {
  PROJECT_SUCCESS,
  PROJECT_ERROR,
  PROJECTDETAIL_SUCCESS,
  PROJECTDETAIL_ERROR,
  ADD_PROJECTDETAIL_SUCCESS,
  UPDATE_PROJECTDETAIL_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  NOTE_SUCCESS,
  ADD_NOTE_SUCCESS,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_ERROR,
  UPLOADIMAGE_SUCCESS,
  UPLOADIMAGE_ERROR,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_ERROR,
} from '../constants/action-types';

const initialState = {
  projectsInfo: [],
  isLoading: false,
  error: false
};

export const getProjectSelector = (state) => ({ ...state.projectReducer });

const projectReducer = (state = initialState, action: Object) => {
  if (action.data == undefined) return state;
  var parseData = JSON.parse(action.data);
  var newData;
  switch (action.type) {
    case PROJECT_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        projectsInfo: parseData,
      };
    }
    case PROJECT_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case PROJECTDETAIL_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        projectsInfo: state.projectsInfo.map(project => project.id == parseData.id ? { ...project, projectdetails: parseData.projectdetails } : project)
      };
    }
    case PROJECTDETAIL_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case ADD_PROJECTDETAIL_SUCCESS: {
      return {
        isLoading: true,
        error: false,
        projectsInfo: state.projectsInfo.map(project => project.id == parseData.projectid ? { ...project, projectdetails: project.projectdetails.map(detail => detail.systemid == parseData.systemid ? parseData : detail) } : project)
      }
    }
    case UPDATE_PROJECTDETAIL_SUCCESS: {
      return {
        isLoading: true,
        error: false,
        projectsInfo: state.projectsInfo.map(project => project.id == parseData.projectid ? { ...project, projectdetails: project.projectdetails.map(detail => detail.id == parseData.id ? parseData : detail) } : project)
      }
    }
    case UPDATE_PROJECT_SUCCESS: {
      return {
        isLoading: true,
        error: false,
        projectsInfo: state.projectsInfo.map(project => project.id == parseData.id ? { ...project, ...parseData } : project)
      }
    }
    case NOTE_SUCCESS: {
      return {
        isLoading: true,
        error: false,
        projectsInfo: state.projectsInfo.map(project => ({ ...project, notes: parseData.filter(note => note.projectid == project.id) }))
      }
    }
    case ADD_NOTE_SUCCESS: {
      return {
        isLoading: true,
        error: false,
        projectsInfo: state.projectsInfo.map(project => project.id == parseData.projectid ? { ...project, notes: [...project.notes, parseData] } : project)
      }
    }
    case UPDATE_NOTE_SUCCESS: {
      return {
        isLoading: true,
        error: false,
        projectsInfo: state.projectsInfo.map(project => project.id == parseData.projectid ? { ...project, notes: project.notes.map(note => note.id == parseData.id ? parseData : note) } : project)
      }
    }
    case GET_IMAGE_SUCCESS: {
      return {
        isLoading: true,
        error: false,
        projectsInfo: state.projectsInfo.map(project => ({ ...project, images: parseData }))
      }
    }
    case UPDATE_NOTE_SUCCESS: {
      return {
        ...state,
        uploadImageSuccess: true,
      }
    }
    case UPDATE_NOTE_ERROR: {
      return {
        ...state,
        uploadImageSuccess: false,
      }
    }
    default: {
      return state;
    }
  }
};

export default projectReducer;
