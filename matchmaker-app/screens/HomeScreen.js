import React, { useContext, useState, useEffect } from "react";
import styles from "../styles.js";
import Profile from "../components/Profile";
import { Text, View, Button, Image, TextInput } from "react-native";
import { addFriend } from "../db/firebaseFunctions";
import { AuthContext } from "../navigation/AuthProvider.js";

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const [friendId, setFriendID] = useState("");

  return (
    <View style={styles.container}>
      <Text>matchmake your friends</Text>
      <Profile></Profile>
      <Profile></Profile>
      <Profile></Profile>
      <TextInput
        placeholder="Friend ID"
        onChangeText={(text) => setFriendID(text)}
        value={friendId}
      />
      <Button
        onPress={() => addFriend(user.uid, friendId)}
        title="Add Friend!"
      />
      <Button onPress={logout} title="Log Out" />
    </View>
  );
}
