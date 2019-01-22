import React, { Component } from "react";
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";

import NewFeedScreen from "./newfeed/NewFeedScreen";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  PanResponder,
  Animated,
  Image,
  Modal
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import GroupScreen from "./group/GroupScreen";
import NotificationScreen from "./notification/NotificationScreen";
import SettingScreen from "./setting/SettingScreen";
import SlidingMenu from "../components/slidingmenu/SlidingMenu";
import WatchScreen from "./watch/WatchScreen";

/* global require */

const headerHeight = 40;
const tabNavigationHeight = 40;

const globalStyle = {
  header: StyleSheet.create({
    container: {
      width: "100%",
      height: headerHeight,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#4267A8",
      flexDirection: "row"
    },
    icon: {
      fontSize: 25,
      color: "white",
      marginHorizontal: "3%"
    },
    searchFieldContainer: {
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
      borderColor: "#BDBDBD",
      borderBottomWidth: 1,
      paddingBottom: 3
    },
    searchFieldIcon: {
      fontSize: 25,
      color: "white"
    },
    searchFieldContent: {
      marginLeft: 2,
      fontSize: 15,
      color: "#BDBDBD"
    }
  }),
  tabNav: StyleSheet.create({
    tabIcon: {
      height: tabNavigationHeight - 10,
      aspectRatio: 1
    },
    tabContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      marginBottom: 5
    },
    container: {
      backgroundColor: "white",
      width: "100%",
      height: tabNavigationHeight,
      justifyContent: "center"
    }
  })
};

const TopNavigation = createMaterialTopTabNavigator(
  {
    NewFeed: {
      screen: NewFeedScreen,
      navigationOptions: {
        tabBarLabel: "NewFeed",
        tabBarIcon: ({ focused }) => {
          const image = focused
            ? require("../../assets/icons/newfeed_active.jpg")
            : require("../../assets/icons/newfeed.jpg");
          return <Image source={image} style={globalStyle.tabNav.tabIcon} />;
        }
      }
    },
    Group: {
      screen: GroupScreen,
      navigationOptions: {
        tabBarLabel: "Group",
        tabBarIcon: ({ focused }) => {
          const image = focused
            ? require("../../assets/icons/group_active.jpg")
            : require("../../assets/icons/group.jpg");
          return <Image source={image} style={globalStyle.tabNav.tabIcon} />;
        }
      }
    },
    Watch: {
      screen: WatchScreen,
      navigationOptions: {
        tabBarLabel: "Watch",
        tabBarIcon: ({ focused }) => {
          const image = focused
            ? require("../../assets/icons/watch_active.jpg")
            : require("../../assets/icons/watch.jpg");
          return <Image source={image} style={globalStyle.tabNav.tabIcon} />;
        }
      }
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        tabBarLabel: "Notification",
        tabBarIcon: ({ focused }) => {
          const image = focused
            ? require("../../assets/icons/noti_active.jpg")
            : require("../../assets/icons/noti.jpg");
          return <Image source={image} style={globalStyle.tabNav.tabIcon} />;
        }
      }
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        tabBarLabel: "Setting",
        tabBarIcon: ({ focused }) => {
          const image = focused
            ? require("../../assets/icons/setting_active.jpg")
            : require("../../assets/icons/setting.jpg");
          return <Image source={image} style={globalStyle.tabNav.tabIcon} />;
        }
      }
    }
  },
  {
    tabBarOptions: {
      tabStyle: StyleSheet.flatten(globalStyle.tabNav.tabContainer),
      style: StyleSheet.flatten(globalStyle.tabNav.container),
      indicatorStyle: { backgroundColor: "transparent" },
      iconStyle: { alignSelf: "center" },
      showIcon: true,
      showLabel: false
    }
  }
);

type Props = {};

export default class HomeScreen extends Component<Props> {
  constructor(props: any) {
    super(props);
  }
  animatedValue: Animated.Value;
  _headerController: PanResponder;

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this._headerController = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
      onPanResponderGrant: () => true,
      onPanResponderMove: this.AnimatedHeader,
      onPanResponderRelease: () => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderTerminate: (evt, gestureState) => {}
    });
  }

  AnimatedHeader = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    let calculatedPos = gestureState.dy;
    if (calculatedPos < -headerHeight) calculatedPos = -headerHeight;
    if (calculatedPos > 0) calculatedPos = 0;

    //this.setState({headerPos : calculatedPos});
    this.animatedValue.setValue(Math.abs(calculatedPos / headerHeight));
  };

  static router = TopNavigation.router;

  render() {
    const { header } = globalStyle;
    const headerPos = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -headerHeight]
    });
    return (
      <View style={{ flex: 1 }} {...this._headerController.panHandlers}>
        <Animated.View style={[header.container, { marginTop: headerPos }]}>
          <Entypo name={"camera"} style={header.icon} />
          <TouchableOpacity style={header.searchFieldContainer}>
            <EvilIcons name={"search"} style={header.searchFieldIcon} />
            <Text style={header.searchFieldContent}>Tìm kiếm</Text>
          </TouchableOpacity>
          <FontAwesome5 name={"facebook-messenger"} style={header.icon} />
        </Animated.View>
        <TopNavigation navigation={this.props.navigation} />
        <SlidingMenu />
      </View>
    );
  }
}
