import { observable, action, autorun, computed } from "mobx";
import { timelineData } from "../../../data";
import {Animated} from "react-native";
type Props = {};

export default class TimelineStore<Props> {
  @observable index: number = 0;
  @observable modalVisible: boolean = false;

   @observable timerValue: Animated.Value = new Animated.Value(0);
   @observable timerAnimated = Animated.timing(
        this.timerValue, {
            toValue : 1,
            duration: 3000,
        }
    );
  @action.bound nextDisplay = () => {
    this.index++;
  };

  @action.bound prevDisplay = () => {
    this.index--;
  };

  @action.bound showModal = () => {
    this.modalVisible = true;
  };

  @action.bound hideModal = () => {
    this.modalVisible = false;
  };

  autoHideModal = autorun(() => {
    if (this.index > timelineData.length - 1) this.modalVisible = false;
    if (this.index < 0) this.index = 0;
  });

  autoNextDisplay = autorun(()=>{
    console.log('22',this.timerValue._value);
    if(this.timerValue._value == 1)
    {
      this.nextDisplay();
      this.timerValue.setValue(0);
      this.timerAnimated.start();
    }
  })
}
