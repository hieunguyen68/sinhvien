/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Navigation from './Navigation/navigations';
import io from 'socket.io-client';

const socket = io('ws://localhost:4000');
socket.on('connect', () => {
  console.log('Successfully connected!');
});

export {socket};

AppRegistry.registerComponent(appName, () => Navigation);
