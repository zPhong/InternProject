// @flow

import React, { Component } from "react";
import {
  Button,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Modal,
  PanResponder,
  TouchableHighlight,
  ImageBackground,
  FlatList
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
/* global require */
import { observer, inject, toJS } from "mobx-react";
import TimeLineModal from "./TimeLineModal";
import { timelineData } from "../../data";
import PostItem from "../../components/post/PostItem";
import EmojiBubble from "../../components/emoji/EmojiBubble";
type Props = {};
type State = {
  user: {
    avatar: string
  },
  timelineStore: any,
  news: Array<{}>
};

@inject("timelineStore")
@observer
export default class NewFeedScreen extends Component<Props> {
  constructor(props) {
    super(props);
  }

  state = {
    user: {
      avatar:
        "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/34962526_1670201939745666_935045514557128704_n.jpg?_nc_cat=109&_nc_ht=scontent.fsgn2-4.fna&oh=922c5e4c7b25b9184d56d6dcf7b7436b&oe=5CB5D7B4"
    }
  };

  componentWillMount() {}

  renderNewsItem(news: object, index: number) {
    const { timelineStore } = this.props;
    return (
      <TouchableHighlight
        key={index}
        underlayColor={"rgba(0,0,0 ,0.2)"}
        style={NewsTimeLineStyle.newsContainer}
        onPress={() => {
          timelineStore.index = index;
          timelineStore.showModal();
        }}
      >
        <ImageBackground
          style={{
            height: "100%",
            width: 115,
            borderRadius: 5,
            justifyContent: "space-between",
            backgroundColor: "red"
          }}
          imageStyle={{
            borderRadius: 5,
            width: "100%",
            height: "100%",
            overflow: "hidden"
          }}
          source={{ uri: news.image }}
          resizeMode="cover"
        >
          <Image
            source={{ uri: news.author.avatar }}
            style={NewsTimeLineStyle.newsAvatar}
          />

          <Text style={NewsTimeLineStyle.newsText}>{news.author.name}</Text>
        </ImageBackground>
      </TouchableHighlight>
    );
  }

  renderHeader = () => {
    return (
      <View>
        <View style={{ backgroundColor: "white" }}>
          <TouchableHighlight
            style={NewFeedStyle.newPostContainer}
            underlayColor={"rgba(189,189,189 ,0.2)"}
            onPress={() => {}}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity>
                <Image
                  source={{ uri: this.state.user.avatar }}
                  style={NewFeedStyle.avatar}
                />
              </TouchableOpacity>
              <View style={NewFeedStyle.textInput}>
                <Text style={NewFeedStyle.textInputText}>
                  Bạn đang nghĩ gì?
                </Text>
              </View>
              <TouchableOpacity style={{ justifyContent: "center" }}>
                <Image
                  source={require("../../../assets/icons/image.jpg")}
                  style={{ width: 43, aspectRatio: 1 }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    color: "#757575",
                    fontWeight: "bold"
                  }}
                >
                  Ảnh
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableHighlight>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              height: 130,
              flexDirection: "row",
              backgroundColor: "white",
              padding: 5
            }}
          >
            {timelineData.map((news, index) => {
              return this.renderNewsItem(news, index);
            })}
          </View>
        </ScrollView>
      </View>
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    const { timelineStore } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1, backgroundColor: "#CDCDCD" }}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={(item, index) => index.toString()}
          data={timelineData}
          renderItem={({ item }) => <PostItem />}
        />

        <TimeLineModal />
        <EmojiBubble />
      </View>
    );
  }
}

const NewFeedStyle = StyleSheet.create({
  newPostContainer: {
    width: "100%",
    height: 60,
    padding: 13,
    justifyContent: "center"
  },
  avatar: {
    height: 40,
    aspectRatio: 1,
    borderRadius: 20
  },
  textInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    marginLeft: 7,
    marginRight: 15,
    borderRadius: 20,
    borderColor: "#CDCDCD",
    borderWidth: 1,
    justifyContent: "center"
  },
  textInputText: {
    fontSize: 22,
    color: "#CDCDCD"
  }
});

const NewsTimeLineStyle = StyleSheet.create({
  newsContainer: {
    height: "100%",
    width: 120
  },
  newsAvatar: {
    width: 35,
    marginTop: 10,
    aspectRatio: 1,
    borderRadius: 20,
    borderColor: "blue",
    borderWidth: 2,
    borderColor: "white",
    padding: 3,
    marginLeft: 3
  },
  newsText: {
    marginLeft: 3,
    marginBottom: 10,
    fontSize: 15,
    color: "white",
    fontWeight: "bold"
  }
});
