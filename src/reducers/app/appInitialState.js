/**
 * Created by talc on 22/06/2016.
 */
"use strict";
import {Record, Map, List} from 'immutable';

const InitialState = Record({
  events: Map({
  }),
  currentSongId: null,
  currentTimestamp: 7
});

export default InitialState;