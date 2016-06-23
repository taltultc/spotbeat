/**
 * Created by talc on 22/06/2016.
 */
import InitialState from "./appInitialState";

const {
  GET_SONGS,
  UPDATE_CURRENT,
  UPDATE_CURRENT_TIME
  } = require("../actionTypes").default;
import {fromJS, Map, List} from 'immutable';

const initialState = new InitialState();

export default function appReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);
  switch (action.type) {
    case UPDATE_CURRENT:
      return state.set("currentSongId", fromJS(action.data));
    case UPDATE_CURRENT_TIME:
      return state.set("currentTimestamp", fromJS(action.data));
    case GET_SONGS:
      return state.set("events", fromJS(action.data));

    default:
      return state;
  }
}