// General Imports
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./hooks/useAuth";
import "./App.css";
import { FriendsListProvider } from "./context/FriendsListContext";

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
import FriendsAccountPage from "./pages/FriendsAccountPage/FriendsAccountPage";

function App() {
  const [friendsList, setFriendsList] = useState([]);
  const [friendsIdList, setFriendsIdList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuth();
  var bigInt = require('big-integer')

  let steamid64ident = bigInt(76561197960265728)

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

  useEffect(() => {
    setFriendsIdList(friendsList.map((friend) =>  steamIdToAccountId(friend)))
  }, [friendsList]);

  useEffect(() => {
    if(user){
      handleFriendsList()
    }
  }, []);
  
  useEffect(() => {
    setLoading(false)
    console.log(friendsIdList)
  }, [friendsIdList]);

  const steamIdToAccountId = (friend) =>{
    let bigAccountId = bigInt(friend.steamid).minus(steamid64ident)
    let accountId = bigAccountId.toJSNumber()
    let personaName = friend.personaname
    return {accountId, personaName}
  } 

  if (loading){
    return <div></div>
  }
  
  return (
    <FriendsListProvider initialFriendsList={friendsIdList}>
      <div className="viewdota">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/friendsAccount/:friendId" element={<FriendsAccountPage />}/>
          {friendsIdList.length > 0 && (
            <>
              <Route path="/account" element={<AccountPage friendsList={friendsIdList}/>} />
              <Route path="/matches" element={<MatchHistoryPage friendsList={friendsIdList}/>} />
              <Route path="/match/:matchId" element={<MatchDetailsPage friendsList={friendsIdList}/> } />
            </>
          )}
        </Routes>
      </div>
    </FriendsListProvider>
  );
}

export default App;
