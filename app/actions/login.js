import { saveToken } from '../utils/storage'
import Channel from '../apis'
import {LOGIN_SUCCESS, LOGIN_ERROR} from '../constants/action-types'

export const loginDefault = () => {
  return (dispatch, getStore) => {
    let email = getStore().auth.user.email
    let password = getStore().auth.user.password
    if(email !== '' && password !== '')
    {
      return login(email, password)(dispatch, getStore);
    }
  }
}

export const login = (email, password, onLogin) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.loginFromApi(email, password)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: LOGIN_ERROR,
          });        
  			} else {
          onLogin();
          return dispatch({
            type: LOGIN_SUCCESS,
            data: data.token,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: LOGIN_ERROR,
        })  
      })
  };
};

export const register = (firstName, lastName, email, password, c_password, onLogin) => {  
  return (dispatch, getStore) => {
    const channel = new Channel()
  	return channel.registerFromApi(firstName, lastName, email, password, c_password)
  		.then(data => {
        if((data == null) || data.errors) {
          return dispatch({
            type: LOGIN_ERROR,
          });        
  			} else {
          onLogin();
          return dispatch({
            type: LOGIN_SUCCESS,
            data: data.token,
          });
  			}
  		})
      .catch(err => {
        return dispatch({
          type: LOGIN_ERROR,
        })  
      })
  };
};
