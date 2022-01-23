import React from "react";
import styles from "../styles.js";
import { ScrollView, Text, View } from "react-native";

import ChatPerson from "../components/ChatPerson.js";
import { NavigationContainer } from "@react-navigation/native";

export default function Chat({navigation}) {
  return (
    <ScrollView>
      <View style={styles.containerNoCenter}> 
      {/* TODO: need to render the right DM - the one associated with the user and whoever is being shown */}
      <ChatPerson press={() => {navigation.navigate('DM')}}></ChatPerson>
      <ChatPerson press={() => {navigation.navigate('DM')}}></ChatPerson>
      <ChatPerson press={() => {navigation.navigate('DM')}}></ChatPerson>
      <ChatPerson press={() => {navigation.navigate('DM')}}></ChatPerson>
    </View>
    </ScrollView>
  );
}