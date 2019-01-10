import { View } from "react-native";
import LoginScreen from "./src/screen/login/LoginScreen";
import HomeScreen from "./src/screen/HomeScreen";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { observer, inject } from "mobx-react";

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

@inject("orientationListener")
@observer
export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { orientationListener } = this.props;
    return (
      <View onLayout={orientationListener.onLayout}>
        <RootStack />
      </View>
    );
  }
}
