import React, { useContext } from "react";
import styles from "../styles.js";
import Profile from "../components/Profile";
import { Text, View, Button, Image, TextInput } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import { sendFriendRequest, addFriend } from "../db/firebaseFunctions";

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>matchmake your friends</Text>
      <Profile></Profile>
      <Profile></Profile>
      <Profile></Profile>
      <Button
        onPress={() =>
          sendFriendRequest(user.uid, "HC6kUOUPAdgwdE98AVGQqaeS5Ns2")
        }
        title="FR Edmond"
      />
      <Button
        onPress={() => addFriend(user.uid, "HC6kUOUPAdgwdE98AVGQqaeS5Ns2")}
        title="Friend Edmond"
      />
      <Button onPress={logout} title="Log Out" />
    </View>
  );
}
