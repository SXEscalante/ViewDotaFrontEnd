// General Imports
import { Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
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
  const steamid64ident = 76561197960265728

  function commidToSteamid(commid) {
    let steamid = [];
    steamid.push('STEAM_0:');
    let steamidacct = parseInt(commid) - steamid64ident;
    
    if (steamidacct % 2 === 0) {
        steamid.push('0:');
    } else {
        steamid.push('1:');
    }
    
    steamid.push((steamidacct / 2).toString());
    
    return steamid.join('');
   }

   function steamidToUsteamid(steamid) {
    var steamidSplit = steamid.split(':');
    
    var y = parseInt(steamidSplit[1]);
    var z = parseInt(steamidSplit[2]);
    
    var steamacct = z * 2 + y;
    
    return steamacct;
   }

   useEffect(() => {
    console.log(steamidToUsteamid(commidToSteamid(76561198079487953)))
   }, []);
  

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
