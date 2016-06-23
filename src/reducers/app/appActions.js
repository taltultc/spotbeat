/**
 * Created by talc on 22/06/2016.
 */
const {
  GET_SONGS,
  UPDATE_CURRENT
  } = require("../actionTypes").default;
var obj  = require('../../JSON/app.json');

export function getSongList() {
  return new Promise((resolve, reject) => {
    resolve(obj);
  });
}

export function getInitData() {
  return dispatch => {
    return getSongList().then((result) => {
      dispatch({type: GET_SONGS, data: result})
    }).catch((error) => {

    })
  };
}
export function getSongs() {
  return dispatch => {
    return getSongList.then((result) => {
      dispatch({type: GET_SONGS, data: ""})
    }).catch((error) => {

    })
  };
}


export function updateCurrentSongId(data) {
  return dispatch => {
    return dispatch({type: UPDATE_CURRENT, data: data})
  };
}
export function updateCurrentTimestamp(data) {
  return dispatch => {
    return dispatch({type: UPDATE_CURRENT_TIME, data: data})
  };
}