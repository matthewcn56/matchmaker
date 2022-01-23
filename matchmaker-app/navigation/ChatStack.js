import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import Chat from '../screens/Chat.js'
import DirectMessage from '../screens/DirectMessage.js'
import { createStackNavigator } from '@react-navigation/stack';

export default function ChatStackScreen() {
    const ChatStack = createStackNavigator();
    return (
        <ChatStack.Navigator initialRouteName ="ChatHome">
            <ChatStack.Screen name="ChatHome" component={Chat}/>
            <ChatStack.Screen name="DM" component={DirectMessage}/>
        </ChatStack.Navigator>
    )
}