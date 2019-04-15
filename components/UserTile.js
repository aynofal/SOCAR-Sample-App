import React, {Component} from 'react';
import {Modal, View, Text, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import {ListItem, Avatar} from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppContext from '../Context';

const {width, height} = Dimensions.get('window');

export default class UserTile extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    componentWillMount() {
    }

    _toggleModalVisible = () => {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    render() {
        const user = this.props.user;
        const isFavorite = this.context.bookmarks.map(user => user.login).includes(user.login);
        return (
            <View>
                <ListItem
                    title={`@${user.login}`}
                    subtitle={user.type}
                    leftAvatar={{source: {uri: user.avatar_url}}}
                    bottomDivider
                    onPress={this._toggleModalVisible}
                    rightIcon={isFavorite?{
                        name: 'star',
                        color: '#007afe',
                    }:null}
                />
                <Modal
                    animationType="slide"
                    transparent
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        return null;
                    }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={styles.modalStyle}>
                            <View style={{
                                flex: 1,
                                padding: 10,
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!isFavorite) {
                                            this.context.addBookmark(user);
                                        }
                                        else this.context.removeBookmark(user.login);
                                        this.context.updateLocalBookmarks();
                                    }}>
                                    <MaterialCommunityIcons
                                        name={`thumb-up${
                                            isFavorite ?
                                                '' : '-outline'
                                            }`}
                                        size={30}
                                        color={isFavorite ? '#007afe' : 'grey'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flex: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Avatar
                                    size={height * 0.08}
                                    rounded
                                    source={{uri: user.avatar_url}}
                                    onPress={() => console.log("Works!")}
                                    containerStyle={{margin: 10}}
                                />
                                <Text style={styles.username}>{user.login}</Text>
                                <View style={{marginBottom: 10, flexDirection: 'row'}}>
                                    <View style={{flex: 1, alignItems: 'flex-end', marginRight: 5}}>
                                        <Text style={{fontWeight: 'bold', textAlign: 'right'}}>
                                            Type
                                        </Text>
                                        <Text style={{fontWeight: 'bold', textAlign: 'right'}}>
                                            Score
                                        </Text>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 5}}>
                                        <Text>
                                            {user.type}
                                        </Text>
                                        <Text>
                                            {user.score.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.btnTxt}>View Profile</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flex: 1,
                                padding: 10,
                                alignItems: 'flex-end'
                            }}>
                                <TouchableOpacity onPress={this._toggleModalVisible}>
                                    <MaterialCommunityIcons name={'close'} size={30}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalStyle: {
        flexDirection: 'row',
        width: width * 0.8,
        maxHeight: height * 0.8,
        backgroundColor: 'white',
        padding: width * 0.02,
        borderRadius: width * 0.02,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    username: {
        fontWeight: 'bold',
        fontSize: height * 0.025
    },
    button: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#007afe',
        marginBottom: 10,
    },
    btnTxt: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    }
})