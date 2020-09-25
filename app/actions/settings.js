import { getToken } from '../utils/storage'
import Channel from '../apis'
import * as Constants from '../constants/action-types'

export const changePassword = (password, newPassword) => {
  console.log(password + ":" + newPassword);
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.changePasswordFromApi(password, newPassword);
  };
};

export const getColors = () => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.getColorFromApi()
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.COLOR_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.COLOR_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.COLOR_ERROR,
        })
      })
  };
};

// Get Colors for mobile test

// export const getColors = () => {
//   return (dispatch, getStore) => {
//     return dispatch({
//       type: Constants.COLOR_SUCCESS,
//       data: JSON.stringify([{ "id": "c0487478-9951-4893-9072-a96d55ea70dc", "name": "red", "status": 1, "version": 0, "created_by": "3", "updated_by": "3", "created_at": "2020-08-18 19:47:31", "updated_at": "2020-08-18 19:47:31" }, { "id": "5a205b8f-39b8-450e-bd15-2ffd8da61bf2", "name": "yellow", "status": 1, "version": 0, "created_by": "3", "updated_by": "3", "created_at": "2020-08-18 19:47:34", "updated_at": "2020-08-18 19:47:34" }, { "id": "4277fa00-8e5a-4167-91ad-adc756876a1c", "name": "orange", "status": 1, "version": 0, "created_by": "3", "updated_by": "3", "created_at": "2020-08-18 19:47:41", "updated_at": "2020-08-18 19:47:41" }, { "id": "84cd5e36-c6e2-49b4-a54c-f4dde11f1e7d", "name": "black", "status": 1, "version": 0, "created_by": "3", "updated_by": "3", "created_at": "2020-08-19 03:03:53", "updated_at": "2020-08-19 03:03:53" }, { "id": "45aeafa6-aaa1-4620-ad7a-c9909fd8b06a", "name": "blue", "status": 1, "version": 0, "created_by": "3", "updated_by": "3", "created_at": "2020-08-19 03:05:16", "updated_at": "2020-08-19 03:05:16" }, { "id": "e222451e-0500-4b47-beaa-354cde5185c5", "name": "white", "status": 1, "version": 0, "created_by": "3", "updated_by": "3", "created_at": "2020-08-19 03:05:51", "updated_at": "2020-08-19 03:05:51" }, { "id": "1009637f-33ba-4d52-8cca-87ba467809e4", "name": "green", "status": 1, "version": 0, "created_by": "3", "updated_by": "3", "created_at": "2020-08-19 03:06:14", "updated_at": "2020-08-19 03:06:14" }])
//     });
//   }
// };


export const addColor = (colorName) => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.addColorFromApi(colorName)
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.ADD_COLOR_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.ADD_COLOR_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.ADD_COLOR_ERROR,
        })
      })
  };
};

export const updateColor = (color) => {
  console.log("Color--------------" + JSON.stringify(color));
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.updateColorFromApi(color)
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.UPDATE_COLOR_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.UPDATE_COLOR_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.UPDATE_COLOR_ERROR,
        })
      })
  };
};

export const deleteColor = (colorId) => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.deleteColorFromApi(colorId)
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.DELETE_COLOR_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.DELETE_COLOR_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.DELETE_COLOR_ERROR,
        })
      })
  };
};

export const getContracts = () => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.getContractTemplateFromApi()
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.CONTRACT_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.CONTRACT_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.CONTRACT_ERROR,
        })
      })
  };
};

export const getIngredientList = () => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.getIngredientListFromApi()
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.INGREDIENT_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.INGREDIENT_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.INGREDIENT_ERROR,
        })
      })
  };
};

export const getOneIngredient = () => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.getOneIngredientFromApi()
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.ONE_INGREDIENT_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.ONE_INGREDIENT_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.ONE_INGREDIENT_ERROR,
        })
      })
  };
};

export const addIngredients = (param) => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.addIngredientFromApi(param)
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.ADD_INGREDIENT_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.ADD_INGREDIENT_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.ADD_INGREDIENT_ERROR,
        })
      })
  };
};

export const updateIngredients = (param) => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.updateIngredientFromApi(param)
      .then(data => {
        console.log("Update Result ================", JSON.stringify(data));
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.UPDATE_INGREDIENT_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.UPDATE_INGREDIENT_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        console.log("Update Result ================", JSON.stringify(err));
        return dispatch({
          type: Constants.UPDATE_INGREDIENT_ERROR,
        })
      })
  };
};

// Get Ingredients for mobile test

// export const getIngredients = () => {
//   return (dispatch, getStore) => {
//     return dispatch({
//       type: Constants.INGREDIENT_SUCCESS,
//       data: JSON.stringify([{ "id": "f8b31858-cf1c-4657-9196-f2a81f65902f", "name": "Acrylic", "status": 1, "version": 0, "created_by": "3", "updated_by": "3", "coverage": '(GAL)', "purchaseprice": '25', "created_at": "2020-08-20 02:56:36", "updated_at": "2020-08-20 02:56:36" }, { "id": "363a27cc-c6a0-41d4-90a0-aa001321bd7e", "name": "Blackline", "status": 1, "version": 0, "created_by": "3", "updated_by": "3", "coverage": 'BOTTLE', "purchaseprice": 80, "created_at": "2020-08-20 02:57:12", "updated_at": "2020-08-20 02:57:12" }, { "id": "52d8a42c-4be9-4225-8e08-8a7de06f7d42", "name": "GraniSeal - over Quartz", "status": 1, "version": 0, "created_by": "3", "updated_by": "3", "coverage": '30#', "purchaseprice": 80, "created_at": "2020-08-20 02:57:31", "updated_at": "2020-08-20 02:57:31" }]),
//     });
//   };
// };

export const getPatterns = () => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.getPatternFromApi()
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.PATTERN_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.PATTERN_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.PATTERN_ERROR,
        })
      })
  };
};

export const addPattern = (patternName) => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.addPatternFromApi(patternName)
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.ADD_PATTERN_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.ADD_PATTERN_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.ADD_PATTERN_ERROR,
        })
      })
  };
};

export const updatePattern = (pattern) => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.updatePatternFromApi(pattern)
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.UPDATE_PATTERN_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.UPDATE_PATTERN_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.UPDATE_PATTERN_ERROR,
        })
      })
  };
};

// Get Pattern mobile test

// export const getPatterns = () => {
//   return (dispatch, getStore) => {
//     return dispatch({
//       type: Constants.PATTERN_SUCCESS,
//       data: JSON.stringify([{"id":"0cf618e9-9425-485b-9ec7-bf13c4085604","name":"grid","status":1,"version":0,"created_by":"3","updated_by":"3","created_at":"2020-08-19 13:48:10","updated_at":"2020-08-19 13:48:42"},{"id":"bf13c4085604","name":"stripe","status":1,"version":0,"created_by":"3","updated_by":"3","created_at":null,"updated_at":null},{"id":"adfafdaff","name":"diamond","status":1,"version":0,"created_by":"3","updated_by":"3","created_at":null,"updated_at":null}]),
//     });
//   };
// };

export const getSystems = () => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.getSystemFromApi()
      .then(data => {
        if (data[data.length - 1] != ']') data += ']';
        if ((data == null) || data.errors) {
          console.log("Error", data)
          return dispatch({
            type: Constants.SYSTEM_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.SYSTEM_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        console.log("Error Catch", err)
        return dispatch({
          type: Constants.SYSTEM_ERROR,
        })
      })
  };
};

export const getSystem = (id) => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.getOneSystemFromApi(id)
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.ONE_SYSTEM_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.ONE_SYSTEM_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.ONE_SYSTEM_ERROR,
        })
      })
  };
};

export const addSystems = (param) => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.addSystemFromApi(param)
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.ADD_SYSTEM_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.ADD_SYSTEM_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.ADD_SYSTEM_ERROR,
        })
      })
  };
};

export const updateSystems = (param) => {
  return (dispatch, getStore) => {
    const channel = new Channel()
    return channel.updateSystemFromApi(param)
      .then(data => {
        if ((data == null) || data.errors) {
          return dispatch({
            type: Constants.UPDATE_SYSTEM_ERROR,
          });
        } else {
          return dispatch({
            type: Constants.UPDATE_SYSTEM_SUCCESS,
            data: data,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: Constants.UPDATE_SYSTEM_ERROR,
        })
      })
  };
};
