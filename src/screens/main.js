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
var FactView = require('../components/FactsView');
import GifView from '../components/GifView';
import TriviaView from '../components/TriviaView';

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
    this.state = {
      currentComp:"",
      index:2
    };
    this.time = 0;
    this.songID = "";
    this.interaction = "";
    this.props.actions.getInitData();
  }
  componentDidMount() {
    let _this = this;
    var subscription = NativeAppEventEmitter.addListener(
      'ACREvent',
      (data) => {
        var d = JSON.parse(data.data);
        console.log("Main",d.metadata);

        if(d.metadata){
          _this.props.actions.updateCurrentSongId(d.metadata.music[0].acrid);
          _this.props.actions.updateCurrentTimestamp(d.metadata.music[0].play_offset_ms);
          _this.time = d.metadata.music[0].play_offset_ms;
          _this.songID = d.metadata.music[0].acrid;
        }
      }
    );

    setInterval(()=>{
      //console.log("ppppp",_this.props.app.get("events").get("song_id").get(0).get("startTime"));

      if(_this.songID){

        var size = _this.props.app.get("events").get(this.songID).toJS();
        for(var i=0;i<size.length;i++){
          let s = _this.props.app.get("events").get(this.songID).get(i).get("startTime");
          if(_this.time == s ||
            ( (_this.time - 1000) < s &&  s < (_this.time + 2000))
          ){

              if(_this.props.app.get("events").get(this.songID).get(i).get("type") == "facts"){
                _this.setState({currentComp:'FactsView',index:i});
              }else if(_this.props.app.get("events").get(this.songID).get(i).get("type") == "trivia"){
                _this.setState({currentComp:'Trivia',index:i});
              }else if(_this.props.app.get("events").get(this.songID).get(i).get("type") =="gif"){
                _this.setState({currentComp:'gif',index:i});
              }
          }
        }
      }


      _this.time+=1000;
    },1000)
  }
  componentWillReceiveProps(nextProps){
    console.log("currentSongId",nextProps.app.get("currentSongId"));
  }

  componentWillReceiveProps(nextProps) {
    this.getScene();
  }
  onAnswerClicked(){
    this.setState({
      currentComp:null,
    })
  }
  getScene(){
    if(this.props.app.get("events").get(this.songID)){
      let eventData = this.props.app.get("events").get(this.songID).get(this.state.index);
      if(this.state.currentComp == "FactsView"){
        return(
          <FactView title="sdfsd" body="body" />
        );
      }else if(this.state.currentComp == "Trivia"){

        return(
          <TriviaView question={eventData.get("question")} answers={eventData.get("answers").toJS()} onAnswerClicked={this.onAnswerClicked.bind(this)} timerDuration={10}  correctAnswerIndex={eventData.get("correctAnswerIndex")}/>
        );
      }else if(this.state.currentComp == "gif"){
        <GifView gifUrl={eventData.get("gifUrl")}/>
      }

    }

  }
  render() {
    return(
      <View>
        {this.getScene()}
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