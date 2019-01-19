import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from "react-native";

import { timelineData } from "../../data";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { observer, inject } from "mobx-react";

type Props = {};

@inject("EmojiController","slidingmenuStore")
@observer
export default class PostItem extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { EmojiController } = this.props;
    return (
      <View style={PostStyle.container}>
        <View
          style={{
            flex: 1,
            minHeight: Dimensions.get("window").height / 2,
            maxHeight: Dimensions.get("window").height
          }}
        >
          <View style={PostStyle.header}>
            <Image
              source={{
                uri:
                  "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/34962526_1670201939745666_935045514557128704_n.jpg?_nc_cat=109&_nc_ht=scontent.fsgn2-4.fna&oh=922c5e4c7b25b9184d56d6dcf7b7436b&oe=5CB5D7B4"
              }}
              resizeMode="contain"
              style={PostStyle.postAvatar}
            />
            <View style={{ height: "100%", marginLeft: 10 }}>
              <Text
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 20,
                  fontWeight: "bold"
                }}
              >
                Lục Trường Phong
              </Text>
              <Text style={{ flex: 1, fontSize: 18, paddingBottom: 15 }}>
                14 giờ trước
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: "auto" }} onPress={()=>{
              this.props.slidingmenuStore.showMenu();
            }}>
              <MaterialIcons name={"more-horiz"} color={"black"} size={30} />
            </TouchableOpacity>
          </View>
          <View style={PostStyle.content}>
            <Text
              style={{
                fontSize: 20,
                color: "black",
                overflow: "hidden",
                paddingLeft: 8
              }}
            >
              1 2 3 4
            </Text>
            <View
              style={{ minHeight: 300, maxHeight: 500, marginTop: 15, flex: 1 }}
            >
              <Image
                source={{
                  uri:
                    "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/34962526_1670201939745666_935045514557128704_n.jpg?_nc_cat=109&_nc_ht=scontent.fsgn2-4.fna&oh=922c5e4c7b25b9184d56d6dcf7b7436b&oe=5CB5D7B4"
                }}
                resizeMode="cover"
                style={{ flex: 1, width: undefined, height: undefined }}
              />
            </View>
          </View>
          <View style={PostStyle.footer}>
            <View style={PostStyle.footerRow}>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={require("../../../assets/icons/like.png")}
                  resizeMode="contain"
                  style={{ width: 25, aspectRatio: 1 }}
                />
                <Image
                  source={require("../../../assets/icons/haha.png")}
                  resizeMode="contain"
                  style={{ width: 25, aspectRatio: 1 }}
                />
                <Image
                  source={require("../../../assets/icons/wow.png")}
                  resizeMode="contain"
                  style={{ width: 25, aspectRatio: 1 }}
                />
                <Text style={{ fontSize: 16, marginLeft: 4 }}>{"1900"}</Text>
                <Text style={{ fontSize: 16, marginLeft: "auto" }}>
                  100 bình luận
                </Text>
              </View>
            </View>
            <View style={[PostStyle.footerRow, { padding: 0 }]}>
              <TouchableHighlight
                underlayColor={"rgba(0,0,0 ,0.2)"}
                style={{ flex: 1 }}
                onPress={() => {
                  console.log("like");
                }}
                onLongPress={evt => {
                  EmojiController.setStartLocation(
                    evt.nativeEvent.pageX,
                    evt.nativeEvent.pageY
                  );
                  EmojiController.showBubble();
                }}
              >
                <View
                  style={PostStyle.footerButton}
                  ref="LikeButton"
                  onLayout={({ nativeEvent }) => {
                    this.refs.LikeButton.measure(
                      (x, y, width, height, pageX, pageY) => {
                        console.log(x, y, width, height, pageX, pageY);
                      }
                    );
                  }}
                >
                  <EvilIcons name="like" size={35} />
                  <Text style={PostStyle.footerButtonText}>Thích</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={"rgba(0,0,0 ,0.2)"}
                style={{ flex: 1 }}
                onPress={() => {}}
              >
                <View style={PostStyle.footerButton}>
                  <MaterialIcons name="chat-bubble-outline" size={25} />
                  <Text style={PostStyle.footerButtonText}>Bình luận</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={"rgba(0,0,0 ,0.2)"}
                style={{ flex: 1 }}
                onPress={() => {}}
              >
                <View style={PostStyle.footerButton}>
                  <MaterialIcons name="share" size={25} />
                  <Text style={PostStyle.footerButtonText}>Chia sẽ</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const PostStyle = StyleSheet.create({
  container: {
    minHeight: 520,
    marginTop: 10,
    backgroundColor: "white"
  },
  header: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingTop: 10
  },
  postAvatar: {
    height: "90%",
    aspectRatio: 1,
    borderRadius: 30
  },
  content: {
    width: "100%",
    flex: 1,
    minHeight: 350,
    maxHeight: 850
  },
  footer: {
    width: "100%",
    marginTop: 5,
    height: 80
  },
  footerRow: {
    flex: 1,
    paddingHorizontal: 8,
    flexDirection: "row",
    width: "100%"
  },
  footerButton: {
    flexDirection: "row",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  footerButtonText: {
    fontSize: 20,
    marginLeft: 3
  }
});
