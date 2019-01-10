import { observable, action } from "mobx";

export default class LoginStore {
  constructor() {}

  @observable isFocused = false;

  @action onFocus() {
    this.isFocused = true;
  }

  @action onBlur() {
    this.isFocused = false;
  }
}
