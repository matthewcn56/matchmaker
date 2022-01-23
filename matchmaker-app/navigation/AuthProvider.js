import React, { createContext } from "react";
import { login, logout } from "../db/firebaseFunctions";
import { useState } from "react";
export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [incomingFriendRequestUids, setIncomingFriendRequestUids] = useState(
    []
  );
  const [chats, setChats] = useState([]);
  const [friendUids, setFriendUids] = useState([]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: login,
        logout: logout,
        incomingFriendRequestUids,
        setIncomingFriendRequestUids,
        friendUids,
        setFriendUids,
        chats,
        setChats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//action
// {
//   type: String,
//   body: String
// }

// onChange= {(event) =>dispatchProfile({
//   type: "name",
//   body: event.target.value
// }) }
