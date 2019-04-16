import React, {Component} from 'react';
import {View, Text, Dimensions, ActivityIndicator} from 'react-native';
import AppContext from '../Context';
import {SafeAreaView} from 'react-navigation';

const {width, height} = Dimensions.get('window');

export default class HomeScreen extends Component {
    static contextType = AppContext;

    render() {
        const loaded = !!this.context.realm;
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={{
                paddingHorizontal: width * 0.1,
                flex: 1,
                width: width,
            }}>
                {
                    loaded ?
                        this.context.bookmarks.length > 0 ?
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                            }}>
                                <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>
                                    You have {this.context.bookmarks.length} liked users.
                                </Text>
                                <Text style={{textAlign: 'center', fontSize: 18,}}>
                                    You can
                                    <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}
                                          onPress={() => navigate('Search')}>
                                        &nbsp;navigate to the Search tab&nbsp;
                                    </Text>
                                    to find more users or
                                    <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}
                                          onPress={() => navigate('Bookmarks')}>
                                        &nbsp;navigate to the Bookmarks tab&nbsp;
                                    </Text>
                                    to view/remove current bookmarks.
                                </Text>
                            </View>
                            :
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                            }}>
                                <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>
                                    It seems that you have no bookmarked users yet...
                                </Text>
                                <Text style={{textAlign: 'center', fontSize: 18}}>
                                    Use
                                    <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}
                                          onPress={() => navigate('Search')}>
                                        &nbsp;the Search tab&nbsp;
                                    </Text>
                                    to look up users and add them to your bookmarks list.
                                </Text>
                            </View>
                        :
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                        }}>
                            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                                Loading...
                            </Text>
                            <ActivityIndicator/>
                        </View>
                }
            </SafeAreaView>
        )
    }
}