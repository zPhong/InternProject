import React from "react";
import {
  Animated,
  Modal,
  PanResponder,
  Dimensions,
  FlatList,
  SafeAreaView
} from "react-native";
import { observer, inject } from "mobx-react/native";
import TimeLineDisplay from "./TimeLineDisplay";
import { timelineData } from "../../data";

const ITEM_WIDTH = Dimensions.get("window").width;

type State = {
  isShouldVisibleModal: boolean
};
type Props = {
  children?: any,
  timelineStore: any
};

@inject("timelineStore")
@observer
export default class TimeLineModal extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.direction = "none";
    this.state = { isShouldVisibleModal: false };
    this.translateY = new Animated.Value(0);
    this.currentIndex = 0;
    this.timelineController = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.translateY.setValue(0);
      },
      onPanResponderMove: (e, gestureState) => {
        if (this.direction === "none") {
          if (Math.abs(gestureState.vy) <= Math.abs(gestureState.vx)) {
            this.direction = "horizontal";
          } else {
            this.direction = "vertical";
          }
        }
        if (this.direction === "vertical") {
          if (gestureState.y0 < Dimensions.get("window").height) {
            if (gestureState.dy >= 0) this.translateY.setValue(gestureState.dy);
            else {
              this.translateY.setValue(0);
            }

            if (gestureState.dy > Dimensions.get("window").height * 0.2)
              this.setState({ isShouldVisibleModal: true });
            else {
              this.setState({ isShouldVisibleModal: false });
            }
          }
        }
        if (this.direction === "horizontal") {
          this._flatList.scrollToOffset({
            animated: true,
            offset: this.currentIndex * ITEM_WIDTH - gestureState.dx
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { x0, y0 } = gestureState;
        const { width, height } = Dimensions.get("window");
        // if (y0 < height * 0.7 && y0 > height * 0.3) {
        //   if (x0 > width * 0.6) this.props.timelineStore.nextDisplay();
        //   if (x0 < width * 0.4) this.props.timelineStore.prevDisplay();

        //   return true;
        // }
        this.direction = "none";
        if (gestureState.dx > ITEM_WIDTH / 2) {
          if (this.currentIndex > 1) {
            this._flatList.scrollToIndex({
              animated: true,
              index: this.currentIndex - 1
            });
          }
        } else {
          if (gestureState.dx < -ITEM_WIDTH / 2) {
            if (this.currentIndex < timelineData.length - 1) {
              this._flatList.scrollToIndex({
                animated: true,
                index: this.currentIndex + 1
              });
            }
          } else {
            this._flatList.scrollToIndex({
              animated: true,
              index: this.currentIndex
            });
          }
        }
        if (this.state.isShouldVisibleModal) {
          Animated.timing(this.translateY, {
            toValue: height,
            duration: 100
          }).start(() => {
            this.props.timelineStore.hideModal();
            this.setState({ isShouldVisibleModal: false });
            this.translateY.setValue(0);
          });
        } else
          Animated.timing(this.translateY, {
            toValue: 0,
            duration: 100
          }).start();
      }
    });
  }

  translateY: Animated.Value;
  timelineController: PanResponder;
  currentIndex: number;
  direction: string;

  render() {
    const { timelineStore } = this.props;

    let backdrop = this.translateY.interpolate({
      inputRange: [0, Dimensions.get("window").height / 2],
      outputRange: ["rgba(0,0,0,1)", "rgba(0,0,0,0)"]
    });
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={timelineStore.modalVisible}
        onRequestClose={() => {
          timelineStore.hideModal;
        }}
      >
        <Animated.View
          style={{
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            position: "absolute",
            backgroundColor: backdrop
          }}
        />

        <Animated.View
          {...this.timelineController.panHandlers}
          style={[
            { transform: [{ translateY: this.translateY }] },
            {
              height: Dimensions.get("window").height,
              width: Dimensions.get("window").width
            }
          ]}
        >
          <SafeAreaView style={{ backgroundColor: "black" }} />
          <FlatList
            ref={ref => (this._flatList = ref)}
            onViewableItemsChanged={e => {
              console.log(e.viewableItems);
              this.currentIndex = e.viewableItems[0].index;
            }}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            scrollEventThrottle={16}
            style={{ height: "100%" }}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            data={timelineData}
            renderItem={({ item, index }) => <TimeLineDisplay index={index} />}
          />
        </Animated.View>
      </Modal>
    );
  }
}
