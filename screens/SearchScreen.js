import React, {Component} from 'react';
import {View, Text, Dimensions, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import AppContext from '../Context';
import User from "../api/User";
import SearchBar from "react-native-elements/src/searchbar/SearchBar";
import ListItem from "react-native-elements/src/list/ListItem";
import UserTile from "../components/UserTile";

const {width, height} = Dimensions.get('window');
const defaultState = {
    results: [],
    page: 1,
    search: '',
    searching: false,
    emptyResults: false,
    isAtEnd: false,
    fetching: false,
    refreshing: false,
};
const refreshingState = {
    results: [],
    page: 1,
    searching: true,
    emptyResults: false,
    isAtEnd: false,
    fetching: false,
    refreshing: true,
};

export default class SearchScreen extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = defaultState;
        this.searchTimer = null;
    }

    getUsers = async () => {
        if (!this.state.isAtEnd) {
            if (!this.state.fetching) {
                this.setState({fetching: true}, async () => {
                    let res = await User.getUsers(this.state.search, {}, this.state.page).catch(err => err);
                    if (res.status === 200)
                        if (res.data.total_count > 0)
                            this.setState({
                                results: [...this.state.results, ...res.data.items],
                                isAtEnd: Math.ceil(res.data.total_count / 10) === this.state.page,
                                page: this.state.page + 1,
                                fetching: false,
                                searching: false
                            });
                        else this.setState({emptyResults: true, fetching: false});
                })
                return 0;
            }
            return -2;
        }
        return -1;
    }

    onRefresh = () => {
        this.setState(refreshingState, () => {
            this.getUsers().then(() => {
                this.setState({refreshing: false});
            });
        })
    }

    updateSearch = search => {
        if (search !== '')
            this.setState({search, searching: true, results: [], emptyResults: false}, () => {
                clearTimeout(this.searchTimer);
                this.searchTimer = setTimeout(() => {
                    this.getUsers();
                }, 1500)
            });
        else this.setState(defaultState, () => clearTimeout(this.searchTimer));
    };

    renderItem = ({item: user}) => (
        <UserTile user={user}/>
    )

    render() {
        const {search} = this.state;
        return (
            <View style={{
                alignItems: 'center',
                flex: 1,
            }}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    containerStyle={{width: width}}
                    onClear={() => this.setState(defaultState)}
                    lightTheme
                />
                <View style={{
                    flex: 1,
                    width: width,
                }}>
                    {
                        this.state.emptyResults ?
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: width * 0.1,
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                }}>
                                    There are no results that match your query.
                                </Text>
                            </View>
                            :
                            this.state.results.length === 0 ?
                                this.state.searching ?
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingHorizontal: width * 0.1,
                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                        }}>
                                            Finding results...
                                        </Text>
                                        <ActivityIndicator/>
                                    </View>
                                    :
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingHorizontal: width * 0.1,
                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                        }}>
                                            Start typing in the search field to get users.
                                        </Text>
                                    </View>
                                :
                                <FlatList
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={this.onRefresh}
                                        />}
                                    data={this.state.results}
                                    keyExtractor={(item) => item.login}
                                    renderItem={this.renderItem}
                                    onEndReached={this.getUsers.bind(this)}
                                    onEndReachedThreshold={0.1}/>
                    }
                    {
                        //Apply an indicator to inform the user that we are currently searching.
                        this.state.searching ?
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                backgroundColor: '#00000060'
                            }}/>
                            :
                            <View/>
                    }
                </View>
            </View>
        )
    }
}