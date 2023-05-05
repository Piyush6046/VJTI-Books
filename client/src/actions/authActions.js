import * as api from '../api/post'
import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS } from './actionConstants';

export const logIn = (authData) => async(dispatch) => {
  dispatch({type:AUTH_START});
  try{
    const {data} = await api.logIn(authData);
    dispatch({type:AUTH_SUCCESS,payload:data});
  }catch(error){
    console.log(error);
    dispatch({type:AUTH_FAIL});
  }
}

export const signUp = (authData) => async(dispatch) => {
  dispatch({type:AUTH_START});
  try{
    const {data:data} = await api.signUp(authData);
    console.log("HEllo");
    console.log(data);
    dispatch({type:AUTH_SUCCESS,payload:data});
  }catch(error){
    console.log(error);
    dispatch({type:AUTH_FAIL});
  }
}
