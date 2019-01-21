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
    const scaleRate = EmojiController.translateY.map((value, index) =>
      value.interpolate({
        inputRange: [0, 60],
        outputRange: [1, 0.01]
      })
    );
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
          {...EmojiController.controller.panHandlers}
          style={[
            {
              position: "absolute",
              left: EmojiController.x,
              width: 300,
              borderRadius: 30,
              flexDirection: "row",
              backgroundColor: "white",
              justifyContent: "space-evenly",
              alignItems: "flex-end",
              elevation: 5,
              paddingVertical: 5
            },
            EmojiController.selectedIndex != -1
              ? {
                  height: EmojiController.minimumSize + 10
                }
              : {
                  height: 50
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
                <Animated.Image
                  key={index}
                  source={emojiImage[index]}
                  style={[
                    {
                      width: EmojiController.iconsSize[index],
                      aspectRatio: 1
                    },
                    {
                      transform: [
                        {
                          translateY: EmojiController.translateY[index]
                        },
                        {
                          scale: scaleRate[index]
                        }
                      ]
                    }
                  ]}
                />
              );
            })}
        </View>
      </Modal>
    );
  }
}
