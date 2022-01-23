import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import global from "../styles.js";


export default function ChatPerson() {
  return (
    <TouchableOpacity>
    <View style={styles.smallContainer}>
        <Image style={styles.img} source={require("../assets/temp.png")} />
        <View>
            <Text numberOfLines={1} style={[global.text2, {fontSize:20, fontFamily: "Poppins_500Medium", color: "#2F2F2F", flex: 1}]}>Name</Text>
            <Text numberOfLines={1} style={[global.text3, styles.lastMessage]}>wow this is a very long message i must really like you or maybe im just using stupid pickup lines</Text>
        </View>
        
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    smallContainer: {
      flexDirection:'row',
      flexWrap: 'nowrap',
      paddingVertical: 15,
      borderBottomColor: "#EAEAEA",
      borderBottomWidth: 0.5,
      borderStyle: "solid",
      marginLeft: 15,
    },
    img: {
      width: 70,
      height: 70,
      borderRadius: 50,
      marginRight: 15,
    },
    lastMessage: {
      color: "#BCBCBC", flex: 1, width: 300
    }
  });