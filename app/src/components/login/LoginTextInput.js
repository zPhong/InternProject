import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import PropTypes from "prop-types";
import LoginScreen from "../../screen/login/LoginScreen";
import { observer } from "mobx-react/native";

const propTypes = {
  placehoder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  underlineColor: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired
};

const defaultProps = {
  placehoder: "",
  secureTextEntry: false,
  underlineColor: "#90CAF9",
  value: "",
  onChangeText: null
};

@observer
export default class LoginTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      isShowPassword: this.props.secureTextEntry ? false : true
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.renderBtn = this.renderBtn.bind(this);
  }

  onFocus = () => {
    this.setState({ isFocused: true });
    LoginScreen.onFocus();
  };

  onBlur = () => {
    this.setState({ isFocused: false });
    LoginScreen.onBlur();
  };

  onChangeText(value) {
    if (this.props.onChangeText != null) this.props.onChangeText(value);
  }

  renderBtn() {
    if (!this.props.secureTextEntry) return null;
    console.log("AA");
    return (
      <TouchableOpacity
        style={{
          marginRight: 5,
          height: "100%",
          justifyContent: "flex-end"
        }}
        onPress={() => {
          this.setState(prevState => ({
            isShowPassword: !prevState.isShowPassword
          }));
        }}
      >
        <Text style={{ fontSize: 15, color: "black" }}>
          {this.state.isShowPassword ? "ẨN" : "HIỂN THỊ"}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { placeholder, underlineColor, value } = this.props;
    return (
      <View
        style={[
          LoginTextInputStyle.container,
          this.state.isFocused
            ? [LoginTextInputStyle.onFocus, { borderColor: underlineColor }]
            : LoginTextInputStyle.normal
        ]}
      >
        <TextInput
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={value}
          onChangeText={this.onChangeText}
          secureTextEntry={!this.state.isShowPassword}
          style={LoginTextInputStyle.textinput}
          placeholder={placeholder}
        />
        {value !== "" ? this.renderBtn() : null}
      </View>
    );
  }
}

LoginTextInput.propTypes = propTypes;
LoginTextInput.defaultProps = defaultProps;

const LoginTextInputStyle = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    marginTop: 18,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "center"
  },
  textinput: {
    fontSize: 20,
    color: "black",
    padding: 0,
    flex: 1
  },
  normal: {
    borderBottomWidth: 0.5,
    borderColor: "#757575"
  },
  onFocus: {
    borderBottomWidth: 3,
    borderColor: "#42A5F5"
  }
});
