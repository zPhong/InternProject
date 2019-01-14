import React, {Component} from "react";
import {
    Button, ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, TouchableHighlight,
    ImageBackground
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
/* global require */

export default class NewFeedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                avatar: 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/34962526_1670201939745666_935045514557128704_n.jpg?_nc_cat=109&_nc_ht=scontent.fsgn2-4.fna&oh=922c5e4c7b25b9184d56d6dcf7b7436b&oe=5CB5D7B4',
            },
            news: [
                {
                    author:
                        {
                            name: 'Phong Lục',
                            avatar: 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/34962526_1670201939745666_935045514557128704_n.jpg?_nc_cat=109&_nc_ht=scontent.fsgn2-4.fna&oh=922c5e4c7b25b9184d56d6dcf7b7436b&oe=5CB5D7B4'
                        },
                    image: 'https://cdn.discordapp.com/attachments/377841449611427842/534031577039110145/lucifer_shingeki_no_bahamut_and_etc__ae83e14f4103850a29706435236979ec.jpg',

                },
                {
                    author:
                        {
                            name: 'Donal',
                            avatar: 'https://cdn.weeb.sh/images/S18B_9dOZ.png'
                        },
                    image: 'https://cdn.weeb.sh/images/S18B_9dOZ.png',

                },
                {
                    author:
                        {
                            name: 'Chii Mio',
                            avatar: 'https://cdn.discordapp.com/attachments/469664496160473098/532833787600568330/unknown.png'
                        },
                    image: 'https://cdn.discordapp.com/attachments/469664496160473098/532980413467983882/image0.jpg',

                },
                {
                    author:
                        {
                            name: 'Hồng Phúc',
                            avatar: 'https://cdn.discordapp.com/attachments/434571820235227140/533968461328678916/50055562_2354776834559132_5806391056538796032_n.pngs'
                        },
                    image: 'https://cdn.discordapp.com/attachments/434571820235227140/533947958908026900/50267768_2040739949308656_4770220275004342272_o.png',

                },
            ],
        }
    }

    renderNewsItem(news) {
        return (
            <TouchableHighlight
                underlayColor={'rgba(0,0,0 ,0.2)'}
                onPress={() => {
                }}>
                <ImageBackground source={{uri: news.image}} style={NewsTimeLineStyle.newsContainer}>
                    <Image source={{uri: news.author.avatar}} style={NewsTimeLineStyle.newsAvatar}/>
                    <Text style={NewsTimeLineStyle.newsText}>{news.author.name}</Text>
                </ImageBackground>
            </TouchableHighlight>
        );
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <ScrollView style={{flex: 1, backgroundColor: '#CDCDCD'}}>
                {/*<View style={{backgroundColor: 'white'}}>*/}
                {/*<TouchableHighlight*/}
                {/*style={NewFeedStyle.newPostContainer}*/}
                {/*underlayColor={'rgba(189,189,189 ,0.2)'}*/}
                {/*onPress={() => {*/}
                {/*}}>*/}
                {/*<View style={{flexDirection: 'row', alignItems: 'center',}}>*/}
                {/*<TouchableOpacity>*/}
                {/*<Image source={{uri: this.state.user.avatar}} style={NewFeedStyle.avatar}/>*/}
                {/*</TouchableOpacity>*/}
                {/*<View style={NewFeedStyle.textInput}>*/}
                {/*<Text style={NewFeedStyle.textInputText}>Bạn đang nghĩ gì?</Text>*/}
                {/*</View>*/}
                {/*<TouchableOpacity style={{justifyContent: 'center '}}>*/}
                {/*<Image source={require('../../../assets/icons/image.jpg')}*/}
                {/*style={{width: 43, aspectRatio: 1}}/>*/}
                {/*<Text style={{fontSize: 13, color: '#757575', fontWeight: 'bold'}}>Ảnh</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*</View>*/}
                {/*</TouchableHighlight>*/}
                {/*</View>*/}
                <ScrollView Horizontal={true}>
                    <View style={{height: 100, flexDirection: 'row'}}>
                        {this.state.news.map(news => this.renderNewsItem(news))}
                    </View>
                </ScrollView>
            </ScrollView>
        );
    }
}

const NewFeedStyle = StyleSheet.create({
    newPostContainer: {
        width: '100%',
        height: 60,
        padding: 13,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    avatar: {
        height: 40,
        aspectRatio: 1,
        borderRadius: 20,
    },
    textInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 15,
        marginLeft: 7,
        marginRight: 15,
        borderRadius: 20,
        borderColor: '#CDCDCD',
        borderWidth: 1,
        justifyContent: 'center',
    },
    textInputText: {
        fontSize: 22,
        color: '#CDCDCD',

    }
});

const NewsTimeLineStyle = StyleSheet.create({
    newsContainer: {
        height: 200,
        width: 120,
        borderRadius: 5,
        marginLeft: 5,
        padding: 5,
        justifyContent: 'space-between'
    },
    newsAvatar: {
        width: 40,
        aspectRatio: 1,
        borderRadius: 20,
        borderColor: 'blue',
        padding: 3,
    },
    newsText: {
        color: 'white',
        fontWeight: 'bold',
    }
});
