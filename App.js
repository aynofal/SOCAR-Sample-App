/**
 * Sample app made for SOCAR Malaysia.
 * Author: Ammar Nofal
 */
import React, {Component} from 'react';
import AppNavigation from './Navigation';
import AppContext from './Context';
import DeviceInfo from 'react-native-device-info';
import {BookmarkSchema} from "./models/Bookmark";

const Realm = require('realm'); //Please excuse the crude use of realm, still adapting to it
//Realm was chosen instead of firebase to reduce the user wait-time.

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            realm: null,
            bookmarks: [],
        }
    }

    updateLocalBookmarks = ()=>{
        this.setState({bookmarks: this.state.realm.objects('Bookmark')})
    };

    addBookmark = (user) => {
        this.state.realm.write(() => {
            this.state.realm.create('Bookmark', user);
            this.updateLocalBookmarks();
        })
    };

    removeBookmark = (login) => {
        this.state.realm.write(()=>{
            let user = this.state.realm.objects('Bookmark').filtered(`login CONTAINS '${login}'`);
            this.state.realm.delete(user);
        })
    }

    async componentWillMount() {
        Realm.open({
            schema: [BookmarkSchema]
        }).then(realm => {
            this.setState({realm}, this.updateLocalBookmarks);
        });
    }

    render() {
        const {Provider} = AppContext;
        return (
            <Provider
                value={{
                    deviceId: DeviceInfo.getDeviceId(),
                    addBookmark: this.addBookmark,
                    realm: this.state.realm,
                    bookmarks: this.state.bookmarks,
                    objAsArray: (obj) => Object.keys(obj).map(key=>obj[key]),
                    databaseHasUser: this.databaseHasUser,
                    removeBookmark: this.removeBookmark,
                    updateLocalBookmarks: this.updateLocalBookmarks,
                }}>
                <AppNavigation/>
            </Provider>
        );
    }
}