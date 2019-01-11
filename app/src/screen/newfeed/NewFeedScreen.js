import React, {Component} from "react";
import {Button, View} from "react-native";

export default class NewFeedScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return(
        <View style={{width :'100%' ,height : 2000, justifyContent: 'center' , backgroundColor : 'green'}}>
            <Button title="Go to Time" onPress={() => {
            }}/>
        </View>
        );
    }
}
