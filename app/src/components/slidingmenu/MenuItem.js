import React from 'react';
import {Text, TouchableHighlight, View,Dimensions} from "react-native";

type Props = {
    icon?: any,
    content: object,
    onPress: function,
}

export default class MenuItem extends React.Component<Props> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={"rgba(0,0,0 ,0.2)"}
                onPress={this.props.onPress}
            >
                <View
                    style={
                    {
                        width: Dimensions.get('window').width,
                        height: 70,
                        flexDirection: 'row',
                        padding: 10,
                        justifyContent: 'center',
                        alignItems :'center',
                    }
                }>
                {
                    this.props.icon
                }
                <View style={{flex: 1, marginLeft: 5 , justifyContent :'center'}}>
                    <Text style={{fontSize : 17, color :'black'}}>{this.props.content.name}</Text>
                    <Text>{this.props.content.descr}</Text>
                </View>
                </View>
            </TouchableHighlight>);
    }
}