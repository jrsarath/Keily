import React, {Component} from "react";
import { View, Text } from "react-native";
import { AppContainer } from './Router';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-smart-splash-screen';
var Analytics = require('react-native-firebase-analytics');


export default class App extends Component {
    constructor(properties) {
      super(properties);
      OneSignal.init("96b64730-7f2c-4d52-8449-2a56b58f4bac");

      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
    }
    componentWillMount() {
      Analytics.setEnabled(true);
    }
    componentDidMount() {
        SplashScreen.close({
          animationType: SplashScreen.animationType.scale,
          duration: 850,
          delay: 1000,
        });
    }
    componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
      console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onIds(device) {
      console.log('Device info: ', device);
    }
  render() {
    return (
      <AppContainer />
    );
  }
}
