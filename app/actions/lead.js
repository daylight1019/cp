import Channel from '../apis'
import {
  LEAD_SUCCESS, LEAD_ERROR, 
  ONE_LEAD_SUCCESS, ONE_LEAD_ERROR, 
  ADD_LEAD_SUCCESS, ADD_LEAD_ERROR,
  ADD_PERSON_SUCCESS, ADD_PERSON_ERROR,
  ADD_PHONE_SUCCESS, ADD_PHONE_ERROR,
  ADD_ADDRESS_SUCCESS, ADD_ADDRESS_ERROR,
  ADD_LEADDETAIL_SUCCESS, ADD_LEADDETAIL_ERROR,
  ADD_PROJECT_SUCCESS, ADD_PROJECT_ERROR,
  ADD_PROJECTDETAIL_SUCCESS, ADD_PROJECTDETAIL_ERROR,
  UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_ERROR,
  UPDATE_PROJECTDETAIL_SUCCESS, UPDATE_PROJECTDETAIL_ERROR,

  UPDATE_PERSON_SUCCESS, UPDATE_PERSON_ERROR,
  UPDATE_PHONE_SUCCESS, UPDATE_PHONE_ERROR,
  UPDATE_ADDRESS_SUCCESS, UPDATE_ADDRESS_ERROR,
  UPDATE_LEADDETAIL_SUCCESS, UPDATE_LEADDETAIL_ERROR,

  PROJECT_SUCCESS, PROJECT_ERROR,
  PROJECTDETAIL_SUCCESS, PROJECTDETAIL_ERROR,
  UPLOADIMAGE_SUCCESS, UPLOADIMAGE_ERROR,

  NOTE_ERROR, NOTE_SUCCESS,
  ADD_NOTE_ERROR, ADD_NOTE_SUCCESS,
  UPDATE_NOTE_ERROR, UPDATE_NOTE_SUCCESS,
} from '../constants/action-types'

export const getLeadsList = () => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.getLeadsListFromApi()
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: LEAD_ERROR,
          });        
  			} else {
          return dispatch({
            type: LEAD_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: LEAD_ERROR,
        })  
      })
  };
};

export const getLead = (id) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.getLeadFromApi(id)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: ONE_LEAD_ERROR,
          });        
  			} else {
          return dispatch({
            type: ONE_LEAD_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: ONE_LEAD_ERROR,
        })  
      })
  };
};

export const addLead = (lead) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.addLeadFromApi(lead)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: ADD_LEAD_ERROR,
          });        
  			} else {
          return dispatch({
            type: ADD_LEAD_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: ADD_LEAD_ERROR,
        })  
      })
  };
};

export const addPerson = (person) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.addPersonFromApi(person)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: ADD_PERSON_ERROR,
          });        
  			} else {
          return dispatch({
            type: ADD_PERSON_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: ADD_PERSON_ERROR,
        })  
      })
  };
};

export const addPhone = (phone) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.addPhoneFromApi(phone)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: ADD_PHONE_ERROR,
          });        
  			} else {
          return dispatch({
            type: ADD_PHONE_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: ADD_PHONE_ERROR,
        })  
      })
  };
};

export const addAddress = (address) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.addAddressFromApi(address)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: ADD_ADDRESS_ERROR,
          });        
  			} else {
          return dispatch({
            type: ADD_ADDRESS_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: ADD_ADDRESS_ERROR,
        })  
      })
  };
};

export const addLeadDetail = (leadDetail) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.addLeadDetailFromApi(leadDetail)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: ADD_LEADDETAIL_ERROR,
          });        
  			} else {
          return dispatch({
            type: ADD_LEADDETAIL_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: ADD_LEADDETAIL_ERROR,
        })  
      })
  };
};


//=====================Update==========================

export const updatePerson = (person) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.updatePersonFromApi(person)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: UPDATE_PERSON_ERROR,
          });        
  			} else {
          return dispatch({
            type: UPDATE_PERSON_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: UPDATE_PERSON_ERROR,
        })  
      })
  };
};

export const updatePhone = (phone) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.updatePhoneFromApi(phone)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: UPDATE_PHONE_ERROR,
          });        
  			} else {
          return dispatch({
            type: UPDATE_PHONE_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: UPDATE_PHONE_ERROR,
        })  
      })
  };
};

export const updateAddress = (address) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.updateAddressFromApi(address)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: UPDATE_ADDRESS_ERROR,
          });        
  			} else {
          return dispatch({
            type: UPDATE_ADDRESS_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: UPDATE_ADDRESS_ERROR,
        })  
      })
  };
};

export const updateLeadDetail = (leadDetail) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.updateLeadDetailFromApi(leadDetail)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: UPDATE_LEADDETAIL_ERROR,
          });        
  			} else {
          return dispatch({
            type: UPDATE_LEADDETAIL_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: UPDATE_LEADDETAIL_ERROR,
        })  
      })
  };
};

// ===================== Project ==========================

export const addProject = (lead) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.addProjectFromApi(lead)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: ADD_PROJECT_ERROR,
          });
  			} else {
          return dispatch({
            type: ADD_PROJECT_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: ADD_PROJECT_ERROR,
        })  
      })
  };
};

export const addProjectDetail = (param) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.addProjectDetailFromApi(param)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: ADD_PROJECTDETAIL_ERROR,
          });
  			} else {
          return dispatch({
            type: ADD_PROJECTDETAIL_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: ADD_PROJECTDETAIL_ERROR,
        })  
      })
  };
};

export const updateProjectDetail = (param) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.updateProjectDetailFromApi(param)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: UPDATE_PROJECTDETAIL_ERROR,
          });
  			} else {
          return dispatch({
            type: UPDATE_PROJECTDETAIL_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: UPDATE_PROJECTDETAIL_ERROR,
        })  
      })
  };
};

export const updateProject = (param) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.updateProjectFromApi(param)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: UPDATE_PROJECT_ERROR,
          });
  			} else {
          return dispatch({
            type: UPDATE_PROJECT_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: UPDATE_PROJECT_ERROR,
        })  
      })
  };
};

export const getProjects = () => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.getProjectsFromApi()
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: PROJECT_ERROR,
          });
  			} else {
          return dispatch({
            type: PROJECT_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: PROJECT_ERROR,
        })  
      })
  };
};

export const getOneProjectDetail = (id) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.getOneProjectDetailFromApi(id)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: PROJECTDETAIL_ERROR,
          });
  			} else {
          return dispatch({
            type: PROJECTDETAIL_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: PROJECTDETAIL_ERROR,
        })  
      })
  };
};

export const getNoteList = (id) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.getNoteFromApi(id)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: NOTE_ERROR,
          });
  			} else {
          return dispatch({
            type: NOTE_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: NOTE_ERROR,
        })  
      })
  };
};

export const addNote = (param) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.addNoteFromApi(param)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: ADD_NOTE_ERROR,
          });
  			} else {
          return dispatch({
            type: ADD_NOTE_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: ADD_NOTE_ERROR,
        })  
      })
  };
};

export const updateNote = (param) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.updateNoteFromApi(param)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: UPDATE_NOTE_ERROR,
          });
  			} else {
          return dispatch({
            type: UPDATE_NOTE_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: UPDATE_NOTE_ERROR,
        })  
      })
  };
};

export const uploadImage = (param) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.uploadImageFromApi(param)
  		.then(data => {
        console.log("Upload Image", JSON.stringify(data))
        if((data == null) || data.errors) {
          return dispatch({
            type: UPLOADIMAGE_ERROR,
          });
  			} else {
          return dispatch({
            type: UPLOADIMAGE_SUCCESS,
            data: data,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: UPLOADIMAGE_ERROR,
        })  
      })
  };
};

// for mobile test

// export const getLeads = () => {  
//   return (dispatch, getStore) => {
    
//   	return dispatch({
//       type: LEAD_SUCCESS,
//       data: JSON.stringify([{id:"lead1",personid:"person1","status":1,"version":0,"created_by":"3","updated_by":"3","created_at":null,"updated_at":null,"person":{"id":"person1","firstname":"Diego","lastname":"Silva","status":1,"version":0,"created_by":"3","updated_by":"3","company":"DS.CO","created_at":"2020-08-19 01:36:20","updated_at":"2020-08-11 01:36:24"}},{"id":"lead2","personid":"person2","status":1,"version":0,"created_by":"3","updated_by":"3","created_at":null,"updated_at":null,"person":{"id":"person2","firstname":"Juli","lastname":"Neyban","status":1,"version":0,"created_by":"3","updated_by":"3","company":"Ney Company","created_at":null,"updated_at":null}},{"id":"lead3","personid":"person3","status":1,"version":0,"created_by":"3","updated_by":"3","created_at":null,"updated_at":null,"person":{"id":"person3","firstname":"Salman","lastname":"Robby","status":1,"version":0,"created_by":"3","updated_by":"3","company":"SR CTO","created_at":null,"updated_at":null}},{"id":"lead4","personid":"person4","status":1,"version":0,"created_by":"3","updated_by":"3","created_at":null,"updated_at":null,"person":{"id":"person4","firstname":"Raul","lastname":"Jhon","status":1,"version":0,"created_by":"3","updated_by":"3","company":"Concrete","created_at":null,"updated_at":null}}]),
//     });
//   };
// };
