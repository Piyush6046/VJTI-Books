import * as api from '../api/post'
import {FETCH_ALL,CREATE,DELETE,FETCH_POST} from './actionConstants'
import { getSavedPosts } from './userActions';

export const getPosts = () => async(dispatch) => {
  try {
    const { data } = await api.getposts();
    console.log(data);
    dispatch({type : FETCH_ALL , payload:data});
  } catch (error) {
    console.log(error);
  }
}

export const getPost = (id) => async (dispatch) => {
  try{
    // dispatch({type:START_LOADING});
    console.log("hello");
    const data = await api.fetchPost(id);//getting the post and storing it in data
    console.log(data);
    console.log("hello");
    dispatch({ type: FETCH_POST, payload: data });
    // dispatch({type:STOP_LOADING});
  }catch(error){
    console.log(error);
  }
}

export const createPost = (post) => async(dispatch) => {
  try {
    const {data} = await api.createPost(post);
    dispatch({type : CREATE , payload:data});
  }catch(error){
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    dispatch(getPosts());
  } catch (error) {
    console.log(error.message);
  }
};