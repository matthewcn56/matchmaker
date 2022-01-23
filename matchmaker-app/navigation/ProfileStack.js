import React from "react";
// import { NavigationContainer } from '@react-navigation/native';
import CreateProfileScreen from "../screens/CreateProfileScreen.js";
import UserProfileScreen from "../screens/UserProfileScreen.js";
import { createStackNavigator } from "@react-navigation/stack";

export default function ProfileStackScreen() {
  const ProfileStack = createStackNavigator();
  return (
    <ProfileStack.Navigator
      initialRouteName="UserProfileScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen
        name="CreateProfile"
        component={CreateProfileScreen}
      />
      <ProfileStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
    </ProfileStack.Navigator>
  );
}
