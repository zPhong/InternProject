/** @format */
import "@babel/polyfill";

import { AppRegistry } from "react-native";

import { name as appName } from "./app.json";
import LoginScreen from "./app/src/screen/login/LoginScreen";
import App from "./app/App";
import ProfileScreen from "./app/src/screen/setting/ProfileScreen";
import SVGScreen from "./app/src/screen/SVGScreen.js";

AppRegistry.registerComponent(appName, () => SVGScreen);
