/**
 * Created by talc on 22/06/2016.
 */

import React, { Component } from 'react';
import ACR from 'ACR';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NativeAppEventEmitter,
  View
} from 'react-native';

import {
  Provider,
  connect
} from 'react-redux';

import {
  Router,
  Scene,
  Actions,
  Modal,
  TabBar
} from 'react-native-router-flux';

import configureStore from './reducers/configureStore';
import AppInitialState from './reducers/app/appInitialState';
import Main from './screens/main';
const RouterWithRedux = connect()(Router);



function getInitialState() {
  return {
    app: new AppInitialState(),
  };
}

class SpotBeat extends Component {
  componentDidMount() {
    ACR.startDetect();

  }

  render() {
    const store = configureStore(getInitialState());
    return (
      <Provider store={store}>
          <View style={styles.container}>
            <Main {...this.props}/>

          </View>
       </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SpotBeat', () => SpotBeat);
