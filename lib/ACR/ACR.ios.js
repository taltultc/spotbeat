/**
 * @providesModule ACR
 * @flow
 */
'use strict';
import { NativeAppEventEmitter } from 'react-native';
var NativeACR = require('NativeModules').ACR;

/**
 * High-level docs for the ACR iOS API can be written here.
 */

var ACR = {
  startDetect: function() {
    NativeACR.startDetect();

  }
};

module.exports = ACR;
