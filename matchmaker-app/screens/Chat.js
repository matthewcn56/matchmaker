import React, { useState, useContext, useEffect } from "react";
import styles from "../styles.js";
import { ScrollView, Text, View } from "react-native";

import ChatPerson from "../components/ChatPerson.js";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../navigation/AuthProvider.js";
import { getUserProfile } from "../db/firebaseFunctions.js";
export default function Chat({ navigation }) {
  const { user, chats } = useContext(AuthContext);
  const [chatPeople, setChatPeople] = useState([]);
  useEffect(() => {
    const grabChatPeople = async () => {
      const newPeople = await Promise.all(
        chats.map(async (chat) => {
          const personUid =
            user.uid == chat.participants[0]
              ? chat.participants[1]
              : chat.participants[0];
          const person = await getUserProfile(personUid);
          console.log("PERSON", person);
          return (
            <ChatPerson
              press={() => {
                navigation.navigate("DM", {
                  chatData: chat,
                  id: chat.id,
                  name: person.displayName ?? "Name",
                  url: person.profilePic,
                });
              }}
              chatData={chat}
              url={person.profilePic}
              name={person.displayName ?? "Name"}
            />
          );
        })
      );
      setChatPeople(newPeople);
    };
    if (!user) {
      return;
    }
    grabChatPeople();
  }, [user]);

  return (
    <ScrollView>
      <View style={styles.containerNoCenter}>
        {/* TODO: need to render the right DM - the one associated with the user and whoever is being shown */}
        {chatPeople}
      </View>
    </ScrollView>
  );
}
