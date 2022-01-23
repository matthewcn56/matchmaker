import React, { useState, useEffect, useContext } from "react";
import { addFriend } from "../db/firebaseFunctions";
import { AuthContext } from "../navigation/AuthProvider.js";
import global from "../styles.js";
import { Text, View, Image, StyleSheet, ScrollView, TextInput, Button } from "react-native";

import PersonSmall from "../components/FriendRequest";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function UserProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const [friendId, setFriendID] = useState("");
  return (
    <ScrollView>
    <View style={[global.container, {marginHorizontal: -20, paddingVertical: 20}]}>
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: user.profilePic || user.photoURL }}
        />
      </View>
      
      <Text style={[global.text2, {fontSize:25, fontFamily: "Poppins_600SemiBold", color: "#2F2F2F"}]}>{String(user.displayName)
      // .split(' ')[0].toLocaleLowerCase()
      }</Text>

      <View style={[styles.buttonSection, {marginTop: 0}]}>
        <TouchableOpacity onPress={logout} title="Log Out" style={global.button}>
          <Text style={global.text}>Edit Profile </Text>
        </TouchableOpacity>
        <TouchableOpacity title="Edit" style={global.button}>
           <Text style={[global.text, ]}>Log Out</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.friendSection}>
        <Text style={[global.text2, {marginVertical: 15}]}>Friend Requests</Text>
        <PersonSmall></PersonSmall>
        <PersonSmall></PersonSmall>
        <PersonSmall></PersonSmall>
        <PersonSmall></PersonSmall>
        <Text style={[global.text2, {marginVertical: 15}]}>Find Friends</Text>
        <TextInput
        style={global.input}
        placeholder="Friend ID"
        onChangeText={(text) => setFriendID(text)}
        value={friendId}
        />
        <Button
          onPress={() => addFriend(user.uid, friendId)}
          title="Add Friend!"
        />
      </View>
    </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  buttonSection: {
    flexDirection:'row',
    flexWrap:'wrap',
  },
  profileImage: {
    height: 125,
    width: 125,
    borderRadius: 100,
    margin: 5
  },
  profileImageContainer: {
    borderColor: "#EA393D",
    borderWidth: 5,
    borderStyle: "solid",
    borderRadius: 100,
    marginBottom: 10
  },
  friendSection: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    paddingHorizontal: 50,
  }

});