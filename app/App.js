import React, { Component } from "react";
import LoginScreen from "./src/screen/login/LoginScreen";
import HomeScreen from "./src/screen/HomeScreen";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import stores from "./src/stores";
import { Provider } from "mobx-react";

const RootStack = createAppContainer(
  createSwitchNavigator(
    {
      Login: LoginScreen,
      Home: HomeScreen
    },
    {
      initialRouteName: "Login"
    }
  )
);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider {...stores}>
        <RootStack />
      </Provider>
    );
  }
}
