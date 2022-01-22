import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import styles from "../styles.js";
import { Text, View, Button, Image, TextInput } from "react-native";
import { addFriend } from "../db/firebaseFunctions";

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [friendId, setFriendID] = useState("");

  useEffect(() => {
    setUserName(user.displayName);
    setProfilePic(user.photoURL);
  }, []); //ComponentDidMount

  return (
    <View style={styles.container}>
      <Text>Welcome {userName}</Text>
      <Image style={styles.profileImage} source={{ uri: profilePic }} />
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
