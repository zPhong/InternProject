import { observable, action, autorun, computed } from "mobx";
import { timelineData } from "../../../data";
type Props = {};

export default class TimelineStore<Props> {
  @observable index: number = 0;
  @observable modalVisible: boolean = false;

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
}
