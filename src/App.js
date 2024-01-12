// General Imports
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./hooks/useAuth";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import MatchHistoryPage from "./pages/MatchHistoryPage/MatchHistoryPage";
import MatchDetailsPage from "./pages/MatchDetailsPage/MatchDetailsPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [friendsList, setFriendsList] = useState([]);
  const [friendsNames, setFriendsNames] = useState([]);
  const [friendsIdList, setFriendsIdList] = useState([]);
  const [user] = useAuth();
  var bigInt = require('big-integer')

  let steamid64ident = bigInt(76561197960265728)

  const handleFriendsList = async () => {
    try {
      const responce = await axios.get(`https://localhost:5001/api/SteamAPI/friendsList/${user.steamId}`)
      if(responce.status === 200){
          setFriendsList(responce.data.friendslist.friends)
      }
    } catch (error) {
        console.log("Error getting account info", error)
    }
  }

  const handleFriendNames = async (steamId) => {
    try {
      const responce = await axios.get(`https://localhost:5001/api/SteamAPI/friendsList/${user.steamId}`)
      if(responce.status === 200){
          setFriendsList(responce.data.friendslist.friends)
      }
    } catch (error) {
        console.log("Error getting account info", error)
    }
  }
  

  useEffect(() => {
    setFriendsNames(friendsIdList.map(friend) => )
    setFriendsIdList(friendsList.map((friend) => steamIdToAccountId(friend.steamid)))
  }, [friendsList]);

  useEffect(() => {
    if(user){
      handleFriendsList()
    }
  }, []);

  useEffect(() => {

  }, [friendsIdList]);

  const steamIdToAccountId = (steamId) =>{
    let bigAccountId = bigInt(steamId).minus(steamid64ident)
    let accountId = bigAccountId.toJSNumber()
    return accountId
  } 

  return (
    <div className="viewdota">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/matches" element={<MatchHistoryPage />} />
        <Route path="/match/:matchId" element={<MatchDetailsPage /> } />
      </Routes>
    </div>
  );
}

export default App;
