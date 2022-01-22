import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { Chat } from '../screens/Chat.js'
import { DirectMessage } from '../screens/DirectMessage.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ChatStackScreen() {
    const ChatStack = createNativeStackNavigator();
    return (
        <ChatStack.Navigator initialRouteName ="Chat">
            <ChatStack.Screen name="ChatHome" component={Chat}/>
            <ChatStack.Screen name="DM" component={DirectMessage}/>
        </ChatStack.Navigator>
    )
}