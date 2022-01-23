import React, { useContext } from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import { sendFriendRequest } from "../db/firebaseFunctions";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import global from "../styles";

//props: friend object
export default function PossibleFriend(props) {
  const { user, setUser } = useContext(AuthContext);
  return (
    <>
      {/* <Text>{props.friend.displayName}</Text>
            <TouchableOpacity onPress={() => {sendFriendRequest(user.uid, props.friend.uid); props.onAccept();}}>
                <Entypo name="check" size={25} color="#2F2F2F" />
            </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => {
          props.setModalVisible(false);
        }}
      >
        <View style={styles.smallContainer}>
          <Image
            style={styles.img}
            source={
              props.friend.profilePic
                ? { uri: props.friend.profilePic }
                : require("../assets/temp.png")
            }
          />
          <View>
            <Text
              numberOfLines={1}
              style={[global.text3, { marginTop: 10 }]}
            >{props.friend.displayName}</Text>

            {/* TODO: there is probably a nicer way to do the UI for a send request */}
            <TouchableOpacity
              onPress={() => {
                sendFriendRequest(user.uid, props.friend.uid);
                props.onAccept();
              }}
            >
              {/* <Entypo name="check" size={25} color="#2F2F2F" /> */}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </>

    //need send request button, name, photo there (if possible)
  );
}

const styles = StyleSheet.create({
  smallContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingVertical: 15,
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 0.5,
    borderStyle: "solid",
    marginLeft: 15,
    width: 300,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 15,
  },
});
