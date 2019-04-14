/**
 * Sample app made for SOCAR Malaysia.
 * Author: Ammar Nofal
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import AppNavigation from './Navigation';
import AppContext from './Context';
import DeviceInfo from 'react-native-device-info';
import Realm from 'realm';

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            realm: null,
            count: 0,
        }
    }

    componentWillMount() {
        Realm.open({
            schema: [{name: 'Dog', properties: {name: 'string'}}]
        }).then(realm => {
            this.setState({ realm });
        });
    }

    increaseCount = () => this.setState({count: this.state.count + 1});
    decreaseCount = () => this.setState({count: this.state.count - 1});

    render() {
        const {Provider} = AppContext;
        return (
            <Provider
                value={{
                    count: this.state.count,
                    increaseCount: this.increaseCount,
                    decreaseCount: this.decreaseCount,
                    deviceId: DeviceInfo.getDeviceId(),
                    realm: this.state.realm,
                }}>
                <AppNavigation/>
            </Provider>
        );
    }
}