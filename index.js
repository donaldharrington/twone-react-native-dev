/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';

LogBox.ignoreLogs(['Require cycle: node_modules']);

AppRegistry.registerComponent(appName, () => App);
