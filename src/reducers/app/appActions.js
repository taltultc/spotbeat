/**
 * Created by talc on 22/06/2016.
 */
const {
  GET_SONGS
  } = require("../actionTypes").default;
var obj  = require('../../JSON/app.json');

export function getSongList() {
  return new Promise((resolve, reject) => {
    resolve(obj);
  });
}

export function getSongs() {
  return dispatch => {
    return getSongList.then((result) => {
      dispatch({type: GET_SONGS, data: ""})
    }).catch((error) => {

    })
  };
}
