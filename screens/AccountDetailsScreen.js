import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Avatar} from "react-native-elements";
import User from "../api/User";
import AppContext from '../Context';

const {width, height} = Dimensions.get('window');

export default class AccountDetailsScreen extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: this.props.navigation.state.params.user,
        }
    }

    async componentDidMount() {
        let res = await User.getUser(this.state.user.login);
        if (res.status === 200) {
            this.setState({
                user: res.data,
                loading: false,
            })
        }
    }

    render() {
        const isFavorite = this.context.bookmarks.map(user => user.login).includes(this.state.user.login);
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                  style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      width: width * 0.33,
                                  }}>
                    <MaterialCommunityIcons name={'chevron-left'} size={30}/>
                    <Text style={{fontWeight: 'bold'}}>
                        Back
                    </Text>
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    paddingHorizontal: width * 0.1,
                    alignItems: 'center',
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1,}}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (!isFavorite) {
                                        this.context.addBookmark(this.props.navigation.state.params.forBookmark);
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
                        <Avatar
                            size={height * 0.08}
                            rounded
                            source={{uri: this.state.user.avatar_url}}
                            containerStyle={{margin: 10}}
                        />
                        <View style={{flex: 1}}/>
                    </View>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: height * 0.025
                    }}>
                        {this.state.user.login}
                    </Text>
                    <View style={{
                        flex: 1,
                        marginTop: 5,
                    }}>
                        {
                            this.state.loading ?
                                <View>
                                    <Text style={{fontWeight: 'bold'}}>Loading User Data...</Text>
                                    <ActivityIndicator/>
                                </View>
                                :
                                <View style={{width: '100%'}}>
                                    {
                                        this.state.user.bio ?
                                            <Text style={{
                                                fontStyle: 'italic',
                                                textAlign: 'center',
                                                marginBottom: 5
                                            }}>
                                                {this.state.user.bio}
                                            </Text>
                                            : <View/>
                                    }
                                    <View style={{flexDirection: 'row', width: '100%'}}>
                                        <Text style={styles.rowTitle}>User Type</Text>
                                        <Text style={styles.rowText}>{this.state.user.type}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', width: '100%'}}>
                                        <Text style={styles.rowTitle}>Name</Text>
                                        <Text
                                            style={styles.rowText}>{this.state.user.name ? this.state.user.name : 'N/A'}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', width: '100%'}}>
                                        <Text style={styles.rowTitle}>Blog</Text>
                                        <Text
                                            style={styles.rowText}>{this.state.user.blog ? this.state.user.blog : 'N/A'}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', width: '100%'}}>
                                        <Text style={styles.rowTitle}>Location</Text>
                                        <Text
                                            style={styles.rowText}>{this.state.user.location ? this.state.user.location : 'N/A'}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', width: '100%'}}>
                                        <Text style={styles.rowTitle}>No. Public Repos</Text>
                                        <Text style={styles.rowText}>{this.state.user.public_repos}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', width: '100%'}}>
                                        <Text style={styles.rowTitle}>No. Public Gists</Text>
                                        <Text style={styles.rowText}>{this.state.user.public_gists}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', width: '100%'}}>
                                        <Text style={styles.rowTitle}>Followers</Text>
                                        <Text style={styles.rowText}>{this.state.user.followers}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', width: '100%'}}>
                                        <Text style={styles.rowTitle}>Following</Text>
                                        <Text style={styles.rowText}>{this.state.user.following}</Text>
                                    </View>
                                </View>
                        }
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    rowTitle: {
        flex: 1,
        textAlign: 'right',
        fontWeight: 'bold',
        paddingHorizontal: 3,
    },
    rowText: {
        flex: 1,
        paddingHorizontal: 3
    }
})