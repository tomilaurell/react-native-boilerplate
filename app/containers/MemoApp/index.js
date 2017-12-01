import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from 'containers/HomeScreen'
import ChatScreen from 'containers/ChatScreen'

export const Screens = StackNavigator({
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen },
});

export default class App extends React.Component {
    render() {
        return <Screens />;
    }
}