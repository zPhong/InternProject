import { observable, action } from "mobx";
type Props = {};
export default class LoginStore<Props> {
  constructor() {}

  @observable isFocused = false;

  @action onFocus() {
    this.isFocused = true;
  }

  @action onBlur() {
    this.isFocused = false;
  }
}
