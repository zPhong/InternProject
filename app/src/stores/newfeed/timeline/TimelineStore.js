import { observable, action, autorun, computed, reaction } from "mobx";
import { timelineData } from "../../../data";
import { Animated } from "react-native";
import { inject, observer } from "mobx-react";
import stores from "../../../stores";

type Props = {};

//@inject("slidingmenuStore")
//@observer
export default class TimelineStore<Props> {
  @observable index: number = -1;
  @observable modalVisible: boolean = false;

  @observable timerValue: Animated.Value = new Animated.Value(0);
  @observable timerAnimated = Animated.timing(this.timerValue, {
    toValue: 1,
    duration: 3000
  });

  @action.bound nextDisplay = () => {
    this.index++;
  };

  @action.bound prevDisplay = () => {
    this.index--;
  };

  @action.bound showModal = () => {
    this.modalVisible = true;
    // this.timerAnimated.start(() => {
    //   this.nextDisplay();
    // });
  };

  @action.bound hideModal = () => {
    this.modalVisible = false;
    this.timerValue.stopAnimation();
  };

  autoHideModal = reaction(
    () => this.index,
    result => {
      if (result <= timelineData.length - 1) {
        this.timerValue.setValue(0);
        this.timerAnimated.start(() => {
          //if (!stores.slidingmenuStore.menuVisible) this.nextDisplay();
        });
      }
      if (result > timelineData.length - 1) {
        this.modalVisible = false;
        this.timerValue.setValue(0);
        this.timerAnimated.start(() => {
          //this.timerValue.setValue(0);
        });
      }
      if (result < 0) this.index = 0;
    }
  );
}
