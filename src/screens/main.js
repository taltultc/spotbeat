/**
 * Created by talc on 23/06/2016.
 */
"use strict";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as appActions from '../reducers/app/appActions';
import Dimensions from 'Dimensions';
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