import React from "react";

import {
    View,
    TextInput,
    ImageBackground,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Animated
} from "react-native";

import {observer, inject} from "mobx-react";

import {timelineData} from "../../data";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { observable, action, autorun, computed } from "mobx";

type Props = {
    timelineStore: any
};

@inject("timelineStore", "slidingmenuStore")
@observer
export default class TimeLineDisplay extends React.Component<Props> {
    constructor(props: any) {
        super(props);
    }



    componentWillMount() {
        this.props.timelineStore.timerAnimated.start(()=>{console.log('1',this.props.timelineStore.timerValue._value)})
    }

    render() {
        const {timelineStore, slidingmenuStore} = this.props;
        const index = timelineStore.index;
        let timerWidth = timelineStore.timerValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['100%', '0%']
        });
        return (
            <ImageBackground
                source={{uri: timelineData[index].image}}
                style={TimeLineStyle.container}
                imageStyle={{resizeMode: "contain"}}
            >
                <View style={TimeLineStyle.header}>
                    <Animated.View style={{paddingRight : timerWidth}}>
                        <View style={TimeLineStyle.headerTimerBar}/>
                    </Animated.View>
                    <View style={TimeLineStyle.headerContent}>
                        <View style={{flexDirection: "row", height: "100%"}}>
                            <Image
                                source={{uri: timelineData[index].author.avatar}}
                                style={{height: "100%", aspectRatio: 1, borderRadius: 50}}
                            />
                            <View
                                style={{
                                    justifyContent: "space-around",
                                    marginLeft: 8,
                                    height: "100%",
                                    paddingTop: 8
                                }}
                            >
                                <Text
                                    style={{fontSize: 14, color: "white", fontWeight: "bold"}}
                                >
                                    {timelineData[index].author.name}
                                </Text>
                                <Text
                                    style={{fontSize: 14, color: "white", fontWeight: "bold"}}
                                >
                                    13 giờ
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", alignSelf: "center"}}>
                            <TouchableOpacity
                                onPress={() => {
                                    slidingmenuStore.showMenu();
                                }}
                                style={{marginRight: 15}}
                            >
                                <MaterialIcons name={"more-horiz"} color={"white"} size={40}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.timelineStore.hideModal();
                                }}
                                style={{marginRight: 15}}
                            >
                                <MaterialIcons name={"close"} color={"white"} size={40}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView horizontal style={TimeLineStyle.footer}>
                    <TextInput
                        placeholder={"Trả lời..."}
                        placeholderTextColor={"white"}
                        style={TimeLineStyle.footerTextInput}
                    />
                    <TouchableOpacity style={TimeLineStyle.footerIcon}>
                        <Image
                            source={require("../../../assets/icons/like.png")}
                            resizeMode="contain"
                            style={{width: "100%", height: "100%"}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={TimeLineStyle.footerIcon}>
                        <Image
                            source={require("../../../assets/icons/love.png")}
                            resizeMode="contain"
                            style={{width: "100%", height: "100%"}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={TimeLineStyle.footerIcon}>
                        <Image
                            source={require("../../../assets/icons/haha.png")}
                            resizeMode="contain"
                            style={{width: "100%", height: "100%"}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={TimeLineStyle.footerIcon}>
                        <Image
                            source={require("../../../assets/icons/wow.png")}
                            resizeMode="contain"
                            style={{width: "100%", height: "100%"}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={TimeLineStyle.footerIcon}>
                        <Image
                            source={require("../../../assets/icons/sad.png")}
                            resizeMode="contain"
                            style={{width: "100%", height: "100%"}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={TimeLineStyle.footerIcon}>
                        <Image
                            source={require("../../../assets/icons/angry.png")}
                            resizeMode="contain"
                            style={{width: "100%", height: "100%"}}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const TimeLineStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(36,38,41)",
        justifyContent: "space-between",
        paddingBottom: 20
    },
    header: {
        width:'100%',
        padding: 10,
        height: 80
    },
    headerTimerBar: {
        height: 4,
        marginBottom: 16,
        backgroundColor: "red",
        borderRadius: 2
    },
    headerContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    footer: {
        width: "100%",
        padding: 10,
        height: 70,
        flexGrow: 0,
        marginBottom: 0
    },
    footerTextInput: {
        height: "90%",
        width: Dimensions.get("window").width * 0.5,
        borderRadius: 50,
        paddingLeft: 20,
        fontSize: 20,
        color: "white",
        borderColor: "white",
        borderWidth: 2,
        backgroundColor: "black"
    },
    footerIcon: {
        height: "90%",
        aspectRatio: 1,
        marginLeft: 5
    }
});
