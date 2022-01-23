import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import global from "../styles.js";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { TouchableOpacity } from "react-native-gesture-handler";

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];
const images = [
  require("../assets/temp.png"),
  require("../assets/Logo.png"),
  require("../assets/temp.png"),
  require("../assets/Logo.png")

]

export default function Profile() {
  return (
    <View style={styles.container}>
    <SwiperFlatList
      index={0}
      data={images}
      renderItem={({ item }) => {
        console.log(item)
        return(
        <View style={[styles.child, { backgroundColor: item }]}>
          {/* <Text style={styles.text}>{item}</Text> */}
          
          <Image style={styles.img} source={item} />
        </View>
      )}
    }
    />
    <View style={{margin: 20, flexDirection:'row', flexWrap:'none', justifyContent: 'space-between'}}>
      <View>
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        <Text style={global.text2}>Name • 19</Text>
      </View>
      <Text style={global.text3}>why do people have such terrible bios on tinder pls i just want a wife</Text>
      </View>
      <TouchableOpacity>
        <MaterialCommunityIcons name="send-circle" size={24} color="#EA393D" />
      </TouchableOpacity>
    </View>
  </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  child: { 
    width: width-40, 
    justifyContent: 'center', 
    height: 300},
  text: { fontSize: 15, textAlign: 'center' },
  img: {
    width: width-40,
    // justifyContent: 'center', 
    height: 300,
    resizeMode: 'cover',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  }
});