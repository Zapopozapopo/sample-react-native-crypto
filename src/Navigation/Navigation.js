import React from 'react'
import {StackNavigator, DrawerNavigator, SwitchNavigator} from 'react-navigation';
import Crypto from '../containers/Crypto'
import CoinDetails from '../containers/CoinDetails'
import Page1 from '../components/Page1'
import OpenDrawer from '../components/OpenDrawer'
import AuthLoadingScreen from '../components/LoadingScreen'
import Tabs from './Tabs'
import LogOut from '../containers/LogOut'

const Enother = StackNavigator({
        enother: {screen: Page1},
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#666',
            },
            headerTintColor: '#666',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: <OpenDrawer navigate={navigation.navigate}/>,
            headerRight:<LogOut navigate={navigation.navigate}/>
        }),
    });

const CryptoStack = StackNavigator({
        header: {screen: Crypto},
        details: {screen: CoinDetails},
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#666',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: <OpenDrawer navigate={navigation.navigate}/>,
            headerRight:<LogOut navigate={navigation.navigate}/>
        }),
    });

const RootStack = DrawerNavigator({
    Home: {screen: CryptoStack,},
    Enother: {screen: Enother}
});

export const Auth =  SwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: RootStack,
        Auth: Tabs,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);