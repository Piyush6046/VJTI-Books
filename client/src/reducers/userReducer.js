import {SAVE_USER} from '../actions/actionConstants'

const userReducer = ( userInfo = {} , action) => {
  switch(action.type){
    case SAVE_USER :
      return action.payload;
    default :
      return userInfo;
  }
};

export default userReducer;