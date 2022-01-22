import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {View, Text, StyleSheet} from "react-native";

import HomeScreen from "../screens/HomeScreen";
import ExtraScreen from "../screens/ExtraScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import Chat from "../screens/Chat"
import { ChatStackScreen } from "./ChatStack.js";

import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 




export default function HomeStack() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <View style={{flex: 1}}>
    <View style={styles.topLogoContainer}>
      <Text style={styles.topLogo}>M</Text>
    </View>
    
    <Tab.Navigator initialRouteName="Home" barStyle={{ backgroundColor: 'white' }} labeled = {false}>
      <Tab.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="user" color={"#EA393D"} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="user-friends" color={"#EA393D"} size={24} style= {{width: 30}} />
          ),
        }}
      />
      <Tab.Screen
        name="Extra"
        component={ExtraScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="heart" color={"#EA393D"} size={24} />
          ),
        }}
      />
    <Tab.Screen
        name="Chat"
        component={Chat} //THIS NEEDS TO BE CHILDREN INSTEAD OF COMPONENT FOR SOME REASON ASK MATT
        options={{
          tabBarIcon: () => (
            <Ionicons name="chatbubble" color={"#EA393D"} size={24} />
          ),
        }}
      /> 
    <Tab.Screen 
      name="CreateProfile"
      component={CreateProfileScreen}
    />
    </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  topLogo: {
    fontFamily:"title",
    color: "#EA393D",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 10,
    fontSize: 45,
  },
  topLogoContainer: {
    // fontFamily:"title",
    // color: "#EA393D",
    // alignSelf: "center",
    // marginTop: 50,
    // marginBottom: 10,
    // fontSize: 45,
    borderColor: '#EAEAEA',
    borderStyle:'solid',
    borderWidth: 0.5
  }
})