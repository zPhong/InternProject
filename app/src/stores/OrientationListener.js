import { observable, action } from "mobx";
import { Dimensions } from "react-native";

export default class OrientationListener {
  constructor() {
    this.isOrientation = false;
  }

  @observable isOrientation;

  @action onLayout(e) {
    if (Dimensions.get("window").width > Dimensions.get("window").height) {
      this.isOrientation = true;
      console.log(this.isOrientation.toString());
    } else this.isOrientation = false;
  }
}
