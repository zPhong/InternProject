import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "react-navigation";

import NewFeedScreen from "./newfeed/NewFeedScreen";
import ProfileScreen from "./profile/ProfileScreen";
import {View} from "react-native";

const TopNavigation = createMaterialTopTabNavigator(
  {
    NewFeed: NewFeedScreen,
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-information-circle${focused ? "" : "-outline"}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge;
        } else if (routeName === "Settings") {
          iconName = `ios-options${focused ? "" : "-outline"}`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

export default class HomeScreen extends Component{
  constructor(props)
  {
    super(props);
  }

  render(){
    return(
        <View style={{flex : 1,}}>
          <TopNavigation/>
        </View>
    );
  }
}
