/**
 * Created by talc on 23/06/2016.
 */
"use strict";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as appActions from '../reducers/app/appActions';
import Dimensions from 'Dimensions';
import ACR from 'ACR';
import React, { Component } from 'react';
const {
  GET_SONGS
  } = require("../reducers/actionTypes").default;

import {
  Actions
} from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  WebView,
  NativeAppEventEmitter,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const actions = [
  appActions,
];

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

class Main extends Component {
  constructor(props){
    super(props);
    this.time = 0;
    this.props.actions.getInitData();
  }
  componentDidMount() {
    let _this = this;
    var subscription = NativeAppEventEmitter.addListener(
      'ACREvent',
      (data) => {
        console.log("Main",data.message);
        if(data.metadata){
          _this.props.actions.updateCurrentSongId(data.metadata.music[0].acrid);
          _this.props.actions.updateCurrentTimestamp(data.metadata.music[0].play_offset_ms);
          _this.time = data.metadata.music[0].play_offset_ms;
        }
      }
    );

    setInterval(()=>{
      //console.log("ppppp",_this.props.app.get("events").get("song_id").get(0).get("startTime"));
      let s = _this.props.app.get("events").get("song_id").get(0).get("startTime");

      if(_this.time = s ||
          ( (_this.time - 1000) < s &&  s < (_this.time + 2000))
      ){
          //alert("trigger event");
      }
      _this.time+=1000;
    },1000)
  }
  componentWillReceiveProps(nextProps){
    console.log("currentSongId",nextProps.app.get("currentSongId"));
  }
  updateTimer(time){
    this.time = time;

  }
  render() {
    return(
      <View>
        <Text>Main</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    borderTopWidth: 2,
    borderBottomWidth:2
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);