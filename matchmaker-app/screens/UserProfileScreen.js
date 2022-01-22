import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import styles from "../styles.js";
import { Text, View, Button, Image } from "react-native";

import PersonSmall from "../components/PersonSmall"

export default function UserProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    setUserName(user.displayName);
    setProfilePic(user.photoURL);
  }, []); //ComponentDidMount

  return (
    <View style={styles.container}>
      
      <Image style={styles.profileImage} source={{ uri: profilePic }} />
      <Text>Welcome {userName}</Text>

      <Button onPress={logout} title="Log Out" />
      <Button title="Edit"/>

      <Text>Friend Requests</Text>
      <PersonSmall></PersonSmall>
      <PersonSmall></PersonSmall>
      <PersonSmall></PersonSmall>
      <PersonSmall></PersonSmall>

      <Text>Find Friends</Text>

    </View>
  );
}
