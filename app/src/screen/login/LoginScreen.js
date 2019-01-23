/* global require */

import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import { observer, inject } from "mobx-react";

import LoginTextInput from "./LoginTextInput";

type Props = {
  navigation: any,
  loginStore: any
};

type State = {
  username: string,
  password: string,
  isEnableLogin: boolean,
  isOrientation: boolean
};

@inject("loginStore")
@observer
export default class LoginScreen extends Component<Props> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isEnableLogin: false,
      isOrientation: false
    };

    this.onLayout = this.onLayout.bind(this);
  }

  onLayout(e: LayoutChangeEvent) {
    if (Dimensions.get("window").width > Dimensions.get("window").height)
      this.setState({ isOrientation: true });
    else this.setState({ isOrientation: false });
  }

  renderTopContent() {
    const { loginStore } = this.props;
    if (loginStore.isFocused || this.state.isOrientation) {
      return (
        <View style={[loginScreenStyle.topContent, { height: "30%" }]}>
          <Image
            source={require("../../../assets/images/fb_logo.png")}
            style={{ height: "50%", aspectRatio: 1 }}
          />
        </View>
      );
    }
    return (
      <View style={loginScreenStyle.topContent}>
        <Image
          source={require("../../../assets/images/topContentBg.jpg")}
          style={loginScreenStyle.topContentImage}
        />
        <View style={loginScreenStyle.topContentLanguage}>
          <Text style={loginScreenStyle.topContentLanguageText}>English</Text>
        </View>
      </View>
    );
  }

  renderBottomContent() {
    const { loginStore } = this.props;

    if (loginStore.isFocused)
      return (
        <View style={[loginScreenStyle.bottomContent, { height: "20%" }]}>
          <TouchableOpacity>
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#0D47A1" }}
            >
              TẠO TÀI KHOẢN FACEBOOK MỚI
            </Text>
          </TouchableOpacity>
        </View>
      );
    return (
      <View style={loginScreenStyle.bottomContent}>
        <TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#0D47A1" }}>
            QUÊN MẬT KHẨU?
          </Text>
        </TouchableOpacity>
        {!this.state.isOrientation ? (
          <View style={loginScreenStyle.lineSeperate}>
            <View style={loginScreenStyle.line} />
            <Text style={{ fontSize: 14, marginHorizontal: 3 }}>HOẶC</Text>
            <View style={loginScreenStyle.line} />
          </View>
        ) : null}
        <TouchableOpacity style={loginScreenStyle.createBtn}>
          <Text style={loginScreenStyle.createBtnText}>
            TẠO TÀI KHOẢN FACEBOOK MỚI
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={loginScreenStyle.container} onLayout={this.onLayout}>
        {this.renderTopContent()}
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

          <TouchableOpacity
            style={loginScreenStyle.loginBtn}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
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
        {this.renderBottomContent()}
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
    flex: 1,
    paddingHorizontal: "10%",
    justifyContent: "space-evenly",
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
    width: "100%",
    height: "30%",
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
