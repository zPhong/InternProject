import React from "react";
import { Animated, Modal, PanResponder } from "react-native";
import { observer, inject } from "mobx-react/native";

type Props = {
  children?: any
};

@inject(['timelineStore']);
@observer

export default class TimeLineDisplay extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.translateY = new Animated.Value(0);
    this.timelineController = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.translateY.setValue(0);
      },
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy >= 0) this.translateY.setValue(gestureState.dy);
        else {
          this.translateY.setValue(0);
        }

        if (gestureState.dy > Dimensions.get("window").height * 0.2)
          this.setState({ isShouldVisibleModal: true });
        else {
          this.setState({ isShouldVisibleModal: false });
        }
      },
      onPanResponderRelease: () => {
        if (this.state.isShouldVisibleModal)
          this.setState({ modalVisible: false });
        else
          Animated.timing(this.translateY, {
            toValue: 0,
            duration: 700
          }).start();
      }
    });
  }

  translateY: Animated.Value;
  timelineController: PanResponder;

  render() {
    var backdrop = this.translateY.interpolate({
      inputRange: [0, Dimensions.get("window").height / 2],
      outputRange: ["rgba(0,0,0,1)", "rgba(0,0,0,0)"]
    });
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <Animated.View
          style={{
            width: "100%",
            height: "100%",
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
          {this.props.children}
        </Animated.View>
      </Modal>
    );
  }
}
