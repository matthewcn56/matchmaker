import React, { useContext } from 'react';
import { Text } from 'react-native';
import { AuthContext } from "../navigation/AuthProvider";
import { sendFriendRequest } from '../db/firebaseFunctions';
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

//props: friend object, onAccept function which will be added to the onPress
export default function PossibleFriend(props) {
    const { user, setUser } = useContext(AuthContext);
    return(
        <>
            <Text>{props.friend.displayName}</Text>
            <TouchableOpacity onPress={() => {sendFriendRequest(user.uid, props.friend.uid); props.onAccept();}}>
                <Entypo name="check" size={25} color="#2F2F2F" />
            </TouchableOpacity>
        </>
        
        //need send request button, name, photo there (if possible)
    )
}