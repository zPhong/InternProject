import React, { Component } from "react";
import LoginScreen from "./src/screen/login/LoginScreen";
import HomeScreen from "./src/screen/HomeScreen";
import {createSwitchNavigator, createAppContainer, createStackNavigator} from "react-navigation";
import stores from "./src/stores";
import { Provider } from "mobx-react";
import ProfileScreen from "./src/screen/setting/ProfileScreen";

const RootStack = createAppContainer(
  createSwitchNavigator(
      {
          Login: LoginScreen,
          Main:
              {
                 screen:
                     createStackNavigator({
                                           Home:
                                               {
                                                   screen: HomeScreen,
                                                   navigationOptions: {
                                                       header: null,
                                                   }
                                               },
                                           Profile: {
                                               screen: ProfileScreen,
                                               navigationOptions:{
                                                   header : null,
                                               }
                                           },
                                       },
                         ),
                navigationOptions:{
                    header : null,
                }
              },
      },
      {
        initialRouteName: "Login"
      }));

type Props = {};
export default class App extends Component<Props> {
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
