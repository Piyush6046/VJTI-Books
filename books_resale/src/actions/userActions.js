import * as api from '../api/post'
// import {FETCH_USER} from './actionConstants'

export const getUser = (id) => async(dispatch) => {
  try {
    console.log(id);
    const {data}  = await api.getUser(id);
    return data;
  } catch (error) {
    console.log(error);
  }
}