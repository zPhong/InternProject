import React, { Component } from "react";
import { Button, Text } from "react-native";
type Props = {};
export default class GroupScreen extends Component<Props> {
  render() {
    const { navigate } = this.props.navigation;
    return <Text>Group</Text>;
  }
}
