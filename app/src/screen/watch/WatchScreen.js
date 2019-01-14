import React, { Component } from "react";
import { Button, Text } from "react-native";

type Props = {
  navigation: any
};
export default class WatchScreen extends Component<Props> {
  render() {
    const { navigate } = this.props.navigation;
    return <Text>Watch</Text>;
  }
}
