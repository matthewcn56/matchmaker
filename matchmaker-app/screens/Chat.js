import React, { useState, useContext } from "react";
import styles from "../styles.js";
import { ScrollView, Text, View } from "react-native";

import ChatPerson from "../components/ChatPerson.js";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../navigation/AuthProvider.js";

export default function Chat({ navigation }) {
  const { user, chats } = useContext(AuthContext);
  const chatPeople = chats.map((chat) => (
    <ChatPerson
      press={() => {
        navigation.navigate("DM", {
          chatData: chat,
          id: chat.id,
        });
      }}
      chatData={chat}
    />
  ));
  return (
    <ScrollView>
      <View style={styles.containerNoCenter}>
        {/* TODO: need to render the right DM - the one associated with the user and whoever is being shown */}
        {chatPeople}
      </View>
    </ScrollView>
  );
}
