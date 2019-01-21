import React from 'react';
import {
    View, TouchableHighlight, Image, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity,
    FlatList
} from 'react-native'
import {profileData, timelineData} from "../../data";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import PostItem from "../../components/newfeed/PostItem";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

type Props={

}

export default class ProfileScreen extends React.Component<Props>{
    constructor(props:any)
    {
        super(props);
    }

    renderProfileInfo(){
        const{Info} = ProfileStyle;
        return(
            <View style={{width:'100%' , backgroundColor :'white'}}>
                <Image style={Info.coverPhoto} source={{uri: profileData.user.cover , width :'100%'}} resizeMode={'cover'} />
                <View style={{alignItems:'center', width : '100%', marginBottom: 20}} >
                    <Image style={Info.avatar} source={{uri : profileData.user.avatar}} resizeMode={'contain'} />
                    <Text style={{color :'black',fontSize : 25, marginTop:20}} >{profileData.user.name}</Text>
                </View>
                <View style={Info.actionBar}>
                    <TouchableHighlight style={{flex : 1}} underlayColor={'#EEEEEE'} onPress={()=>{}} >
                        <View style={Info.actionButton}>
                        <AntDesign name={'form'} size={20} color={'#616161'} />
                        <Text style={Info.actionButtonText}>Đăng</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex : 1}} underlayColor={'#EEEEEE'} onPress={()=>{}} >
                        <View style={Info.actionButton}>
                        <FontAwesome5  name={'user-edit'} size={20} color={'#616161'}/>
                        <Text style={Info.actionButtonText}>Chỉnh sửa trang cá nhân</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex : 1}} underlayColor={'#EEEEEE'} onPress={()=>{}} >
                        <View style={Info.actionButton}>
                        <Feather name={'list'} size={20} color={'#616161'} />
                        <Text style={Info.actionButtonText}>Nhật kí hoạt động</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex : 1}} underlayColor={'#EEEEEE'} onPress={()=>{}} >
                        <View style={Info.actionButton}>
                        <Feather name={'more-horizontal'} size={20} color={'#616161'} />
                        <Text style={Info.actionButtonText}>Khác</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={Info.pictureContainer}>
                    <Text style={{fontSize : 25, color :'black',marginVertical: 10}}>Ảnh</Text>
                    <View style={{flexWrap: 'wrap' , flexDirection: 'row' ,
                        borderRadius : 15, overflow: 'hidden',paddingHorizontal: -5,
                    justifyContent: 'space-between'}}>
                    {
                        profileData.images.map((x,i)=>{
                            if(i < 5)
                            {
                                if(i < 2)
                                {
                                    return <Image key={i} source={{uri : x}} style={Info.largeImg} resizeMode={'contain'}/>
                                }
                                return <Image key={i} source={{uri : x}} style={Info.smallImg} resizeMode={'contain'}/>
                            }
                        })
                    }
                    </View>

                    <TouchableOpacity
                        style={{width : '100%',paddingHorizontal : 15 ,
                        height : 40, borderRadius: 10, backgroundColor : '#E0E0E0', justifyContent : 'center',
                        alignItems : 'center', marginVertical : 20  }}
                        onPress={()=>{}}>
                        <Text style={{fontSize :20, color :'black',fontWeight: 'bold'}}>Xem tất cả ảnh</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render(){
        const {header} = ProfileStyle;
        return(
            <View style={{flex : 1,}}>
                <View style={header.container}>
                    <TouchableOpacity style={header.icon} onPress={()=>{
                        this.props.navigation.goBack();
                    }}>
                        <MaterialIcons name={"arrow-back"} size={25} color={'white'}  />
                    </TouchableOpacity>
                    <TouchableOpacity style={header.searchFieldContainer}>
                        <EvilIcons name={"search"} style={header.searchFieldIcon} />
                        <Text style={header.searchFieldContent}>Tìm kiếm</Text>
                    </TouchableOpacity>
                    <FontAwesome5 name={"facebook-messenger"} style={header.icon} size={25} color={'white'} />
                </View>
                <FlatList
                    style={{ flex: 1, backgroundColor: "#CDCDCD" }}
                    ListHeaderComponent={this.renderProfileInfo}
                    keyExtractor={(item, index) => index.toString()}
                    data={timelineData}
                    renderItem={({ item }) => <PostItem />}
                />
            </View>
        );
    }
}


const ProfileStyle={
  Info : StyleSheet.create({
      coverPhoto:{
          width:'100%',
          height: SCREEN_HEIGHT /3,
      },
      avatar:{
          width : SCREEN_WIDTH/3,
          aspectRatio: 1,
          marginTop: - SCREEN_WIDTH/6,
          borderColor :'white',
          borderWidth: 2,
      },
      actionBar:{
          padding : 20,
          width :'100%',
          height : 120,
          flexDirection:'row',
      },
      actionButton:{
          flex : 1,
          justifyContent: 'flex-start',
          alignItems: 'center',

      },
      actionButtonText:{
          color :'#616161',
          fontSize : 15,
          textAlign: 'center',
          marginTop :10,
      },
      pictureContainer:{
          paddingHorizontal: 15,
          borderTopColor : '#E0E0E0',
          borderTopWidth: 1,
      },
      largeImg:{
          width: (SCREEN_WIDTH - 30 ) /2 - 10,
          aspectRatio: 1,
      },
      smallImg:{
          width: (SCREEN_WIDTH - 30 ) /3 - 10,
          aspectRatio: 1,
          marginTop : 10,
      }
}),
    header: StyleSheet.create({
        container: {
            width: "100%",
            height: 40,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#4267A8",
            flexDirection: "row"
        },
        icon: {
            marginHorizontal: "3%"
        },
        searchFieldContainer: {
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            borderColor: "#BDBDBD",
            borderBottomWidth: 1,
            paddingBottom: 3
        },
        searchFieldIcon: {
            fontSize: 25,
            color: "white"
        },
        searchFieldContent: {
            marginLeft: 2,
            fontSize: 15,
            color: "#BDBDBD"
        }
    }),
};