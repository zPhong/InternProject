import { observable, action } from "mobx";
import { PanResponder, Dimensions, Animated } from "react-native";

type Props = {};

const NORMAL_SIZE = 40;

export default class EmojiController<Props> {
  @observable x: number = 0;
  @observable y: number = 0;

  @observable iconsSize: Array = Array(6).fill(null).map((x,i)=>{
    new Animated.Value(NORMAL_SIZE);
  });
  @observable minimumSize: number = NORMAL_SIZE - 12;
  @observable maximumSize: number = NORMAL_SIZE + 48;
  @observable selectedIndex: number = -1;

  @observable emojiBubbleVisible: boolean = false;
  @observable translateY: Array = Array(6)
    .fill(null)
    .map((x, i) => new Animated.Value(50));



  @observable controller: any = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: (e, gestureState) => false,
    onPanResponderMove: (e, gestureState) => {
      let x = gestureState.x0 - this.x + gestureState.dx;
      let y = this.y - gestureState.y0 + gestureState.dy;

      if (y > 0 && y < NORMAL_SIZE + 10) {
        this.selectedIndex = x / 50 > 6 ? -1 : parseInt(x / 50);


        this.iconsSize.fill(this.minimumSize);
        this.iconsSize[this.selectedIndex] = this.maximumSize;
      } else {
        this.selectedIndex = -1;
      }

      if (this.selectedIndex == -1) {
        this.iconsSize.fill(NORMAL_SIZE);      }
    },
    onPanResponderRelease: (evt, gestureState) => {
        this.iconsSize.fill(NORMAL_SIZE);
        if(this.selectedIndex != -1) {
            this.selectedIndex = -1;
            this.hideBubble();
        }
    }
  });

  @action.bound setStartLocation(x: number, y: number) {
    this.x =
      x > Dimensions.get("window").width - 300
        ? Dimensions.get("window").width - 310
        : x;
    this.y = y;
  }

  @action.bound showBubble() {
    this.emojiBubbleVisible = true;
    Animated.stagger(
      50,
      this.translateY.map((value, index) =>
        Animated.timing(value, {
          toValue: 0,
          duration: 200
        })
      )
    ).start();
  }

  @action.bound hideBubble() {
    setTimeout(() => {
      this.emojiBubbleVisible = false;
    }, 450);
    Animated.stagger(
      50,
      [...this.translateY].reverse().map((value, index) =>
        Animated.timing(value, {
          toValue: 50,
          duration: 200
        })
      )
    ).start();
  }
}
