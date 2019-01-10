import React, { Component } from "react";

export default class ProfileScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return <Button title="Go to Setting" />;
  }
}
