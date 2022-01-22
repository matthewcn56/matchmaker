import React, {useReducer, useContext} from 'react';
import global from "../styles.js";
import { updateProfile } from '../db/firebaseFunctions.js';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import { AuthContext } from "../navigation/AuthProvider";


export default function CreateProfileScreen(){
    const [userInfo, dispatchUserInfo] = useReducer(
        infoReducer,
        initialInfo
    );
    const { user, setUser } = useContext(AuthContext);

    const[age, setAge] = useState(18)

    return(
        <View style={[global.containerNoCenter, {padding: 50}]}>
        <ScrollView >
            <Text style={global.title}>MatchMaker</Text>
            <Text style={global.text2}>Let's get you set up.</Text>
            <View style = {styles.inputSection}>
            <TextInput
                style={global.input}
                placeholder="Name"
                value={userInfo.name}
<<<<<<< HEAD
                onChangeText={(event) => dispatchUserInfo({type: "name", body: event})} //reducer is smart enough to know what the previous info is 
            />      
            {/* <TextInput
                style={global.input}
                placeholder="Age"
            /> */}
            {/* <Slider
                value={this.state.value}
                onValueChange={value => this.setState({value})}
            /> */}
            {/* <Text>Value: {this.state.value}</Text> */}
=======
                onChangeText={(event) => dispatchUserInfo({type: "name", body: event})} //reducer is smart enough to know what the previous info is and just use event because it's onChangeText and react-native is weird
            />    
            <TextInput
                placeholder="Age"
                value={userInfo.age}
                onChangeText={(event) => dispatchUserInfo({type: "age", body: event})}
            />
>>>>>>> chat-stack
            <TextInput
                style={global.input}
                placeholder="Gender"
                value={userInfo.gender}
                onChangeText={(event) => dispatchUserInfo({type: "gender", body: event})}
            />
            <TextInput
                style={global.input}
                placeholder="Sexuality"
                value={userInfo.sexuality}
                onChangeText={(event) => dispatchUserInfo({type: "sexuality", body: event})}
            />
            <TextInput
                style={global.input}
                placeholder="Bio"
                value={userInfo.bio}
                onChangeText={(event) => dispatchUserInfo({type: "bio", body: event})}
            />
<<<<<<< HEAD
            <TouchableOpacity style={global.button} onPress={() => console.log(userInfo)}>
                <Text style={global.text}>Let's get started!</Text>
=======
            <TouchableOpacity onPress={() => {updateProfile(userInfo, user.uid)}} style={styles.signinButton}>
                <Text>Create Profile</Text>
>>>>>>> chat-stack
            </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
   inputSection: {
       marginTop: 20
   }
})

//REDUCER SETUP
const initialInfo = {
    name: "",
    age: 0,
    gender: "",
    sexuality: "",
    bio: "",
    ciasux: true
};

const infoReducer = (prevInfo, action) => {
    switch(action.type){
        case "name": {
            return {
                ...prevInfo,
                name: action.body
            }
        }
        case "age":{
<<<<<<< HEAD

        }
        case "gender":{

=======
            return {
                ...prevInfo, 
                age: action.body
            }
        }
        case "gender":{
            return {
                ...prevInfo,
                gender: action.body
            }
>>>>>>> chat-stack
        }
        case "sexuality":{
            return {
                ...prevInfo, 
                sexuality: action.body
            }
        }
        case "bio":{
            return {
                ...prevInfo, 
                bio: action.body
            }
        }
    }
}

