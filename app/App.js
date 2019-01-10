import React, { Component } from "react";
import stores from "./src/stores";
import { Provider } from "mobx-react";
import Root from "./src/screen/RootStack";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider {...stores}>
        <Root />
      </Provider>
    );
  }
}
