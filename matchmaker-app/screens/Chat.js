import React from "react";
import styles from "../styles.js";
import { ScrollView, Text, View } from "react-native";

import ChatPerson from "../components/ChatPerson.js";

export default function Chat() {
  return (
    <ScrollView>
      <View style={styles.containerNoCenter}>
      <ChatPerson></ChatPerson>
      <ChatPerson></ChatPerson>
      <ChatPerson></ChatPerson>
      <ChatPerson></ChatPerson>
      <ChatPerson></ChatPerson>
      <ChatPerson></ChatPerson>
      <ChatPerson></ChatPerson>
      <ChatPerson></ChatPerson>
      <ChatPerson></ChatPerson>
      <ChatPerson></ChatPerson>
      
    </View>
    </ScrollView>
  );
}