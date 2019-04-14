import {createAppContainer, createBottomTabNavigator} from 'react-navigation';
import SearchScreen from "./screens/SearchScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import BookmarksScreen from "./screens/BookmarksScreen";

const BottomTabNavigator = createBottomTabNavigator(
    {
        Home: HomeScreen,
        Search: SearchScreen,
        Bookmarks: BookmarksScreen,
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let IconComponent = MaterialCommunityIcons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `home${focused ? '' : '-outline'}`;
                } else if (routeName === 'Search') {
                    iconName = `account-search${focused ? '' : '-outline'}`;
                } else if (routeName === 'Bookmarks') {
                    iconName = `thumb-up${focused ? '' : '-outline'}`
                }
                return <IconComponent name={iconName} size={25} color={tintColor}/>;
            },
        }),
    }
);
export default createAppContainer(BottomTabNavigator)