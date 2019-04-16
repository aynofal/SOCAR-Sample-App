import React, {Component} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import AppContext from '../Context';
import UserTile from "../components/UserTile";
import {SafeAreaView} from 'react-navigation';

const {width, height} = Dimensions.get('window');

export default class BookmarksScreen extends Component{
    static contextType = AppContext;
    renderItem = ({item: user}) => (
        <UserTile user={user}
                  navigation={this.props.navigation}/>
    )
    render(){
        return (
            <SafeAreaView style={{
                flex: 1,
            }}>
                <FlatList
                    data={this.context.bookmarks}
                    keyExtractor={(item) => item.login}
                    renderItem={this.renderItem}/>
            </SafeAreaView>
        )
    }
}