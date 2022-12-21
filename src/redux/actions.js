export const SET_LOGIN_USER_DETAIL = 'SET_LOGIN_USER_DETAIL';
export const SET_LOGIN_USER_DATA = 'SET_LOGIN_USER_DATA';
export const SET_USER_FOR_CHAT = 'SET_USER_FOR_CHAT';

export const setLoginUserDetail = data => dispatch => {
  dispatch({
    type: SET_LOGIN_USER_DETAIL,
    payload: data,
  });
};
export const setUserForChat = data => dispatch => {
  dispatch({
    type: SET_USER_FOR_CHAT,
    payload: data,
  });
};
export const setLoggedInUserData = data => dispatch => {
  dispatch({
    type: SET_LOGIN_USER_DATA,
    payload: data,
  });
};
