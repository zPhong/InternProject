import React from "react";
import { View, TouchableWithoutFeedback,Animated } from "react-native";

type Props = {
  icon: any,
  title: string,
  direction : string,
  onPress: function,
};

export default class ActionButton extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    this.AnimatedValue = new Animated.Value(0);
  }

  AnimatedValue: Animated.Value;

 
  render() {
    const Background = this.AnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#E0E0E0", "#9E9E9E"]
    });
    const FontSize = this.AnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 15.3]
    });
    return (
      <TouchableWithoutFeedback
        style={{
          flex: 1
        }}
        onPress={this.props.onPress}
        onPressIn={()=>{
            Animated.timing(
            this.AnimatedValue,
            {
                toValue : 1,
                duration : 200,
            }).start();
        }}
        onPressOut={() => {
             Animated.timing(
                this.AnimatedValue,
                {
                    toValue : 0,
                    duration : 200,
                }
            ).start();
        }}
      >
      <View style={{flex : 1,}}>
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          <Animated.View
            style={[
              { height: "90%", aspectRatio: 1, borderRadius: 40,justifyContent: "center", alignItems: "center"  },
              { backgroundColor: Background }
            ]}
          >
            {this.props.icon}
          </Animated.View>
        </View>
        <View style={{flex: 3, alignItems :'center' , marginTop : 5,}}>
            <Animated.Text
          style={[
            {
              color: "#616161",
              textAlign: "center",
            },
            {
                fontSize : FontSize,
            }
          ]}
        >
          {this.props.title}
        </Animated.Text>
        </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
