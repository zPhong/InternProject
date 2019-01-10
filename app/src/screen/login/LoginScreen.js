import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import { action } from "mobx";

import LoginTextInput from "../../components/login/LoginTextInput";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isEnableLogin: false,
      isFocused: true
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  @action onFocus() {
    this.setState({ isFocused: true });
  }
  @action onBlur() {
    this.setState({ isFocused: false });
  }

  render() {
    return (
      <View style={loginScreenStyle.container}>
        <View style={loginScreenStyle.topContent}>
          <Image
            source={require("../../../assets/images/topContentBg.jpg")}
            style={loginScreenStyle.topContentImage}
          />
          <View style={loginScreenStyle.topContentLanguage}>
            <Text style={loginScreenStyle.topContentLanguageText}>
              {this.state.isFocused.toString()}
            </Text>
          </View>
        </View>
        <View style={loginScreenStyle.midContent}>
          <LoginTextInput
            placeholder={"Điện thoại hoặc Email"}
            value={this.state.username}
            onChangeText={value => {
              this.setState({ username: value }, () => {
                if (value !== "" && this.state.password !== "")
                  this.setState({ isEnableLogin: true });
              });
            }}
          />
          <LoginTextInput
            placeholder={"Mật khẩu"}
            value={this.state.password}
            textContentType={"password"}
            secureTextEntry={true}
            onChangeText={value => {
              this.setState({ password: value }, () => {
                if (value !== "" && this.state.username !== "")
                  this.setState({ isEnableLogin: true });
              });
            }}
          />

          <TouchableOpacity style={loginScreenStyle.loginBtn}>
            <Text
              style={[
                loginScreenStyle.loginBtnText,
                { color: !this.state.isEnableLogin ? "#E0E0E0" : "white" }
              ]}
            >
              ĐĂNG NHẬP
            </Text>
          </TouchableOpacity>
        </View>
        <View style={loginScreenStyle.bottomContent}>
          <TouchableOpacity>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#0D47A1" }}
            >
              QUÊN MẬT KHẨU?
            </Text>
          </TouchableOpacity>
          <View style={loginScreenStyle.lineSeperate}>
            <View style={loginScreenStyle.line} />
            <Text style={{ fontSize: 14, marginHorizontal: 3 }}>HOẶC</Text>
            <View style={loginScreenStyle.line} />
          </View>
          <TouchableOpacity style={loginScreenStyle.createBtn}>
            <Text style={loginScreenStyle.createBtnText}>
              TẠO TÀI KHOẢN FACEBOOK MỚI
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const loginScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  topContent: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center"
  },
  topContaineronFocus: {},
  topContentImage: {
    flex: 1,
    width: "100%",
    resizeMode: "stretch"
  },
  topContentLanguage: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  topContentLanguageText: {
    fontSize: 15
  },
  midContent: {
    width: "100%",
    paddingHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center"
  },
  loginBtn: {
    width: "100%",
    height: 45,
    backgroundColor: "#5C6BC0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  loginBtnText: {
    fontSize: 18
  },
  bottomContent: {
    flex: 1,
    paddingHorizontal: "10%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: "3%"
  },
  lineSeperate: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#BDBDBD"
  },
  createBtn: {
    backgroundColor: "#81C784",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: "80%"
  },
  createBtnText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold"
  }
});
