import { observable, action, autorun, computed } from "mobx";
import stores from "../stores";
import { Animated, PanResponder, Dimensions } from "react-native";

type Props = {};

export default class SlidingUpMenuStore<Props> {
  @observable menuVisible: boolean = false;
  @observable contentHeight: number = Dimensions.get("window").height;
  @observable translateY: Animated.Value = new Animated.Value(
    this.contentHeight
  );
  @observable isShouldVisibleModal: boolean = false;

  @observable menuController: PanResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => false,
    onPanResponderGrant: (e, gestureState) => {
      this.translateY.setValue(0);
    },
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.y0 < Dimensions.get("window").height) {
        if (gestureState.dy >= 0) this.translateY.setValue(gestureState.dy);
        else {
          this.translateY.setValue(0);
        }

        if (gestureState.dy > this.contentHeight * 0.4)
          this.isShouldVisibleModal = true;
        else {
          this.isShouldVisibleModal = false;
        }
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { x0, y0, dx, dy } = gestureState;
      const { width, height } = Dimensions.get("window");

      if (y0 < height - this.contentHeight && dx === 0 && dy === 0) {
        console.log("close");
        this.hideMenu();
        return true;
      }
      if (this.isShouldVisibleModal) {
        console.log("auto hide");
        this.hideMenu();
        this.isShouldVisibleModal = false;
      } else
        Animated.timing(this.translateY, {
          toValue: 0,
          duration: 100
        }).start();
    }
  });

  @action.bound showMenu = () => {
    this.menuVisible = true;
    Animated.timing(this.translateY, {
      toValue: 0,
      duration: 300
    }).start();
    stores.timelineStore.timerAnimated.stop();
  };

  @action.bound hideMenu = () => {
    Animated.timing(this.translateY, {
      toValue: this.contentHeight,
      duration: 300
    }).start(() => {
      this.menuVisible = false;
      if (stores.timelineStore.modalVisible)
        stores.timelineStore.timerAnimated.start(() => {
          if (!this.menuVisible) stores.timelineStore.nextDisplay();
        });
    });
  };
}
