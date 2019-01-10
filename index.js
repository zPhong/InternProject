/** @format */

import { AppRegistry } from "react-native";

import { name as appName } from "./app.json";
import LoginScreen from "./app/src/screen/login/LoginScreen";

AppRegistry.registerComponent(appName, () => LoginScreen);
