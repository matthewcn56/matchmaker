import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F6F6F6",
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
  },
  containerNoCenter: {
    flex: 1,
    // backgroundColor: "#F6F6F6",
    backgroundColor: 'white',
    alignItems: "flex-start",
    // justifyContent: "center",
  },
  input: {
    alignItems: "center",
    borderColor: "#BCBCBC",
    fontFamily: "Poppins_400Regular",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
  },
  button: {
    borderColor: "#EA393D",
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginVertical: 30,
    marginEnd: 10,
    alignSelf: "center"
  },
  buttonAction: {
    borderColor: "#EA393D",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#EA393D",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginVertical: 30,
    marginEnd: 10,
    alignSelf: "center"
  },
  text: {
    color: "#EA393D",
    fontFamily: "Poppins_400Regular",
  },
  text2: {
    color: "#EA393D",
    fontFamily: "Poppins_400Regular",
    fontSize: 20
  },
  text3: {
    // color: "#EA393D",
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
  },
  title: {
    color: "#EA393D",
    fontFamily: "title",
    fontSize: 50
  }
});
