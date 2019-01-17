import { observable, action, autorun, computed } from "mobx";
import stores from "../stores";

type Props = {};

export default class SlidingUpMenuStore<Props> {
  @observable menuVisible: boolean = false;

  @action.bound showMenu = () => {
    this.menuVisible = true;
    stores.timelineStore.timerAnimated.stop();
  };

  @action.bound hideMenu = () => {
    this.menuVisible = false;
    stores.timelineStore.timerAnimated.start(() => {
      if (!this.menuVisible) stores.timelineStore.nextDisplay();
    });
  };
}
