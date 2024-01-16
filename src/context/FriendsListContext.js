import React, { createContext, useState } from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

export const FriendsListContext = createContext();

export const FriendsListProvider = ({children}) => {
    const [friendsList, setFriendsList] = useState([]);
    const [user] = useAuth();

    const handleFriendsList = async () => {
        try {
          const response = await axios.get(`https://localhost:5001/api/SteamAPI/friendsList/${user.steamId}`)
          if(response.status === 200){
              setFriendsList(response.data)
          }
        } catch (error) {
            console.log("Error getting account info", error)
        }
    }

    return(
        <FriendsListContext.Provider value={{friendsList, setFriendsList}}>{children}</FriendsListContext.Provider>
    )
}