import React from "react";
import {
  View,
  Image,
  Animated,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import { observer, inject } from "mobx-react";
import { Directions } from "react-native-gesture-handler";
import { emojiImage } from "../../data";

type Props = {};

@inject("EmojiController")
@observer
export default class EmojiBubble extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { EmojiController } = this.props;
    return (
      <Modal
        animationType={"none"}
        transparent={true}
        visible={EmojiController.emojiBubbleVisible}
        onRequestClose={() => {
          EmojiController.hideBubble();
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "transpanrent"
          }}
          onPress={() => {
            EmojiController.hideBubble();
          }}
        />
        <View
          style={[
            {
              position: "absolute",
              left: EmojiController.x,
              width: 350,
              height: 60,
              borderRadius: 30,
              flexDirection: "row",
              backgroundColor: "white",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: 10
            },
            EmojiController.y < 150
              ? { top: EmojiController.y }
              : { bottom: Dimensions.get("window").height - EmojiController.y }
          ]}
        >
          {Array(6)
            .fill(0)
            .map((value, index) => {
              return (
                <Image
                  key={index}
                  source={emojiImage[index]}
                  resizeMode="contain"
                  style={{ height: 40, aspectRatio: 1 }}
                />
              );
            })}
        </View>
      </Modal>
    );
  }
}
