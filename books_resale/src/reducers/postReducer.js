// import React from 'react';
import {FETCH_ALL,CREATE,FETCH_POST, SAVED_POSTS} from '../actions/actionConstants'

const postReducer = ( posts = [], action ) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case FETCH_POST :
      return {...posts, post : action.payload.data};
    case CREATE :
      return [ ...posts,action.payload ];
    case SAVED_POSTS:
      console.log("mamam : ",action.payload);
      return { ...posts, savedposts : action.payload};
    default:
      return posts;
  }
}
export default postReducer;