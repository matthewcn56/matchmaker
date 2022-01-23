import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import global from "../styles.js";

import { Entypo } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-gesture-handler";


export default function FriendRequest() {
  return (
    <View style={styles.smallContainer}>
      <View style={styles.row}>
        <Image style={styles.img} source={require("../assets/temp.png")} />
        <Text style={global.text3}>Name</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity>
          <Entypo name="check" size={25} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.reqButton}>
          <Entypo name="cross" size={30} color="#EA393D" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  smallContainer: {
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems: 'center',
    justifyContent: "space-between",
    marginVertical: 5,
    paddingLeft: 10,
    borderRadius: 15,
    alignSelf: "stretch",
    backgroundColor: "#F9F9F9"
  },
  row: {
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center'
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginEnd: 10,
  },
  reqButton: {
    // justifyContent: "flex-end"
    margin: 10
  }
  
});