import React from "react";
import {
  Animated,
  Modal,
  PanResponder,
  Dimensions,
  FlatList
} from "react-native";
import { observer, inject } from "mobx-react/native";
import TimeLineDisplay from "./TimeLineDisplay";

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

    this.state = { isShouldVisibleModal: false };
    this.translateY = new Animated.Value(0);
    this.timelineController = PanResponder.create({
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

          if (gestureState.dy > Dimensions.get("window").height * 0.2)
            this.setState({ isShouldVisibleModal: true });
          else {
            this.setState({ isShouldVisibleModal: false });
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { x0, y0 } = gestureState;
        const { width, height } = Dimensions.get("window");
        if (y0 < height * 0.7 && y0 > height * 0.3) {
          if (x0 > width * 0.6) this.props.timelineStore.nextDisplay();
          if (x0 < width * 0.4) this.props.timelineStore.prevDisplay();
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
          <TimeLineDisplay />
        </Animated.View>
      </Modal>
    );
  }
}
