import { observable, action } from "mobx";
import { PanResponder, Dimensions, Animated } from "react-native";

type Props = {};

export default class EmojiController<Props> {
  @observable x: number = 0;
  @observable y: number = 0;

  @observable translateY: Array = Array(6).fill(new Animated.Value(0));

  @observable controller: any = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: (e, gestureState) => false,
    onPanResponderMove: (e, gestureState) => {},
    onPanResponderRelease: (evt, gestureState) => {}
  });

  @observable emojiBubbleVisible: boolean = false;

  @action.bound setStartLocation(x: number, y: number) {
    this.x =
      x > Dimensions.get("window").width - 350
        ? Dimensions.get("window").width - 370
        : x;
    this.y = y;
  }

  @action.bound showBubble() {
    this.emojiBubbleVisible = true;
  }

  @action.bound hideBubble() {
    this.emojiBubbleVisible = false;
  }
}
