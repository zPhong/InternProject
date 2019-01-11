/** @format */
import '@babel/polyfill'

import { AppRegistry } from "react-native";

import { name as appName } from "./app.json";
import LoginScreen from "./app/src/screen/login/LoginScreen";
import App from "./app/App";

AppRegistry.registerComponent(appName, () => App);
