/**
 * Created by talc on 22/06/2016.
 */
"use strict";
import {Record, Map, List} from 'immutable';

const InitialState = Record({
  events: Map({

    "song_id": [
      {
        startTime: "",
        duration: 20,
        type: "facts",
        text: "Cool fact"
      },
      {
        startTime: "",
        duration: 20,
        type: "trivia",
        question: "Where do I run",
        answers: [
            "inside of me",
            "outside of me"
        ]
      },
      {
        startTime: "",
        duration: 20,
        type: "trivia",
        question: "gif",
        url: "http://"
      },
    ]
  }),
  currentSongId: null,
  currentTimestamp: 7
});

export default InitialState;