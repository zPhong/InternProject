import React from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  Text,
  View,
  Dimensions,
  StyleSheet
} from "react-native";

type Props = {
  type: "opacity" | "highlight",
  underlayColor?: string,
  icon?: any,
  title?: string,
  color?: string,
  style?: StyleSheet.Styles,
  textStyle: StyleSheet.Styles,
  direction?: "row" | "column",
  onPress: any => null,
  onLongPress: any => null
};

export default class Button extends React.Component<Props> {
  static defaultProps = {
    type: "opacity",
    color: "transparent",
    underlayColor: "#EEEEEE",
    style: {},
    textStyle: {},
    direction: "row",
    onPress: () => {
      console.log("clicked");
    },
    onLongPress: () => {
      console.log("Long Pressed");
    }
  };

  renderButtonContent() {
    const { icon, title, direction, color, textStyle, style } = this.props;
    return (
      <View
        style={[
          ButtonStyle.container,
          { backgroundColor: color },
          style,
          { flexDirection: direction }
        ]}
      >
        {icon}
        <Text
          style={[
            ButtonStyle.title,
            direction === "row" ? { marginLeft: 3 } : { marginTop: 3 },
            textStyle
          ]}
        >
          {title}
        </Text>
      </View>
    );
  }

  render() {
    const { type, onPress, onLongPress, underlayColor } = this.props;

    if (type === "opacity")
      return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
          {this.renderButtonContent()}
        </TouchableOpacity>
      );
    else
      return (
        <TouchableHighlight
          onPress={onPress}
          underlayColor={underlayColor}
          onLongPress={onLongPress}
        >
          {this.renderButtonContent()}
        </TouchableHighlight>
      );
  }
}

const ButtonStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  title: {
    fontSize: 20
  }
});
