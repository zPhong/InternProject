import { observable, action, autorun, computed } from "mobx";

type Props = {};

export default class SlidingUpMenuStore<Props> {
  @observable menuVisible: boolean = false;

  @action.bound showMenu = () => {
    this.menuVisible = true;
  };

  @action.bound hideMenu = () => {
    this.menuVisible = false;
  };
}
