import React from "react";
import { Modal, PanResponder, Animated, Dimensions, Text } from "react-native";
import { inject, observer } from "mobx-react";

type State = {
  isShouldVisibleModal: boolean,
  contentHeight: number
};
type Props = {
  slidingmenuStore: any
};

@inject("slidingmenuStore")
@observer
export default class SlidingMenu extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.state = { isShouldVisibleModal: false };
    this.translateY = new Animated.Value(0);
    this.menuController = PanResponder.create({
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

          console.log(this.state.contentHeight);
          if (gestureState.dy > this.state.contentHeight * 0.2)
            this.setState({ isShouldVisibleModal: true });
          else {
            this.setState({ isShouldVisibleModal: false });
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { x0, y0 } = gestureState;
        const { width, height } = Dimensions.get("window");

        if (this.state.isShouldVisibleModal) {
          Animated.timing(this.translateY, {
            toValue: height,
            duration: 100
          }).start(() => {
            this.props.slidingmenuStore.hideMenu();
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
  menuController: PanResponder;

  render() {
    const { slidingmenuStore } = this.props;
    var backdrop = this.translateY.interpolate({
      inputRange: [0, Dimensions.get("window").height / 2],
      outputRange: ["rgba(0,0,0,1)", "rgba(0,0,0,0)"]
    });
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={slidingmenuStore.menuVisible}
        onRequestClose={() => {}}
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
          {...this.menuController.panHandlers}
          onLayout={e => {
            this.setState({ contentHeight: e.nativeEvent.layout.height });
          }}
          style={[
            { transform: [{ translateY: this.translateY }] },
            {
              width: Dimensions.get("window").width,
              marginTop: "auto",
              backgroundColor: "white"
            }
          ]}
        >
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
          <Text>AAAA</Text>
        </Animated.View>
      </Modal>
    );
  }
}
