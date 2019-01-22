import React from "react";
import {
  Modal,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import { inject, observer } from "mobx-react";
import MenuItem from "./MenuItem";
import { timelineData } from "../../data";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  slidingmenuStore: any,
  timelineStore: any
};

@inject("timelineStore", "slidingmenuStore")
@observer
export default class SlidingMenu extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  menuController: PanResponder;

  render() {
    const { slidingmenuStore, timelineStore } = this.props;
    var backdrop = slidingmenuStore.translateY.interpolate({
      inputRange: [0, Dimensions.get("window").height / 2],
      outputRange: ["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]
    });
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={slidingmenuStore.menuVisible}
        onRequestClose={() => {}}
      >
        <Animated.View
          {...slidingmenuStore.menuController.panHandlers}
          style={{
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            position: "absolute",
            backgroundColor: backdrop
          }}
        />
        <Animated.View
          {...slidingmenuStore.menuController.panHandlers}
          onLayout={e => {
            slidingmenuStore.contentHeight = e.nativeEvent.layout.height;
          }}
          style={[
            { transform: [{ translateY: slidingmenuStore.translateY }] },
            {
              width: Dimensions.get("window").width,
              marginTop: "auto",
              backgroundColor: "white"
            }
          ]}
        >
          {timelineData[this.props.timelineStore.index] !== undefined ? (
            <MenuItem
              content={{
                name: `Tắt thông báo về tin của ${
                  timelineData[this.props.timelineStore.index].author.name
                }`
              }}
              icon={<AntDesign name={"closesquareo"} size={30} />}
              onPress={() => {
                console.log("Tắt thông báo");
              }}
            />
          ) : null}
          <MenuItem
            content={{ name: "Gửi phản hồi hoặc báo tin" }}
            icon={<MaterialIcons name={"error-outline"} size={30} />}
            onPress={() => {
              console.log("Report");
            }}
          />
          <MenuItem
            content={{ name: "Đã xảy ra lỗi" }}
            icon={<MaterialCommunityIcons name={"bug-outline"} size={30} />}
            onPress={() => {
              console.log("Bugr");
            }}
          />
        </Animated.View>
      </Modal>
    );
  }
}
