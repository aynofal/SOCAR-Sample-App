import React, {Component} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import AppContext from '../Context';
import UserTile from "../components/UserTile";

const {width, height} = Dimensions.get('window');

export default class BookmarksScreen extends Component{
    static contextType = AppContext;
    renderItem = ({item: user}) => (
        <UserTile user={user}/>
    )
    render(){
        return (
            <View style={{
                flex: 1,
            }}>
                <FlatList
                    data={this.context.bookmarks}
                    keyExtractor={(item) => item.login}
                    renderItem={this.renderItem}/>
            </View>
        )
    }
}