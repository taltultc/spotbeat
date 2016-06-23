/**
 * Created by talc on 22/06/2016.
 */
import InitialState from "./appInitialState";

const {
  GET_SONGS
  } = require("../actionTypes").default;
import {fromJS, Map, List} from 'immutable';

const initialState = new InitialState();

export default function appReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);
  switch (action.type) {
    case "songs":
      return state.set("songs", fromJS(action.songs));
    default:
      return state;
  }
}