import React, { useContext } from "react";
import global from "../styles.js";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  return (
    <View style={global.container}>
       <Image style={styles.logo} source={require("../assets/Vector.png")} />
      <TouchableOpacity onPress={() => login()} style={[global.button, {paddingHorizontal: 60}]}>
        <Text style={global.text}>Sign Up or Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: -50
  }
});