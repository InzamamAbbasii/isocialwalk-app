import {
  SET_LOGIN_USER_DETAIL,
  SET_USER_FOR_CHAT,
  SET_LOGIN_USER_DATA,
} from './actions';

const initialState = {
  //
  userDetail: '',
  loggedInUser: null,
  selectedChatUser: {
    chatroomId: '',
    name: '',
  },
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_USER_DETAIL:
      return {...state, userDetail: action.payload};
    case SET_USER_FOR_CHAT:
      return {...state, selectedChatUser: action.payload};
    case SET_LOGIN_USER_DATA:
      return {...state, loggedInUser: action.payload};
    default:
      return state;
  }
}

export default userReducer;
