import React, { useContext } from "react";
import global from "../styles.js";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  return (
    <View style={global.container}>
       <Image style={styles.logo} source={require("../assets/Vector.png")} />
      <TouchableOpacity onPress={() => login()} style={styles.signinButton}>
        <Text style={styles.signinButtonText}>Sign Up or Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: -50
  },
  signinButton: {
    alignItems: "center",
    borderColor: "#EA393D",
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 50,
    marginTop: 30
  },
  signinButtonText: {
    color: "#EA393D",
    fontFamily: "Poppins_400Regular",
  }
});