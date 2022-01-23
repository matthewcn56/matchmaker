import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import global from "../styles.js";
import { AuthContext } from "../navigation/AuthProvider.js";
import img from "../assets/temp.png";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  acceptFriendRequest,
  denyFriendRequest,
  getUserProfile,
} from "../db/firebaseFunctions.js";

export default function FriendRequest(props) {
  const [userDisplay, setUserDisplay] = useState(null);
  useEffect(() => {
    const grabUser = async () => {
      const result = await getUserProfile(props.uid);
      setUserDisplay(result);
    };
    grabUser();
  }, [props.uid]);
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.smallContainer}>
      <View style={styles.row}>
        <Image
          style={styles.img}
          source={
            userDisplay && userDisplay.profilePic
              ? { uri: userDisplay.profilePic }
              : img
          }
        />
        <Text style={global.text3}>
          {userDisplay ? userDisplay.displayName : "getting user info..."}
        </Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => acceptFriendRequest(user.uid, props.uid)}
        >
          <Entypo name="check" size={25} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reqButton}
          onPress={() => denyFriendRequest(user.uid, props.uid)}
        >
          <Entypo name="cross" size={30} color="#EA393D" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  smallContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingLeft: 10,
    borderRadius: 15,
    alignSelf: "stretch",
    backgroundColor: "#F9F9F9",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginEnd: 10,
  },
  reqButton: {
    // justifyContent: "flex-end"
    margin: 10,
  },
});
