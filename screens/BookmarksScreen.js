import React, {Component} from 'react';
import {View, Text} from 'react-native';
import AppContext from '../Context';

export default class BookmarksScreen extends Component{
    static contextType = AppContext;
    render(){
        const info = this.context.realm !== null
            ? 'Number of dogs in this Realm: ' + this.context.realm.objects('Dog').length
            : 'Loading...';
        return (
            <View style={{
                alignItems: 'center',
                flex: 1,
            }}>
                <Text>{info}</Text>
                <Text>Device ID is: {this.context.deviceId}</Text>
                <View style={{
                    flex: 1,
                }}>

                </View>
            </View>
        )
    }
}