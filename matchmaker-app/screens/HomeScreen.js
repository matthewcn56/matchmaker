import React, { useContext } from "react";
import styles from "../styles.js";
import Profile from "../components/Profile";
import { Text, View, Button, Image, TextInput } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import { acceptFriendRequest, sendFriendRequest } from "../db/firebaseFunctions";

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
          acceptFriendRequest(user.uid, "6k1oXzK12Lae4IbBf0P2bkmlL9F3")
        }
        title="Accept FR Matt"
      />
      <Button onPress={logout} title="Log Out" />
    </View>
  );
}
