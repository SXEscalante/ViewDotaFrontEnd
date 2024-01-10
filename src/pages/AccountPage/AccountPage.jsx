import { useDeferredValue, useEffect, useState } from "react";
import AccountInfoDisplay from "../../components/AccountInfoDisplay/AccountInfoDisplay";
import FriendsListEntrty from "../../components/FriendListEntry/FriendsListEntry";
import useAuth from "../../hooks/useAuth";

import "./AccountPage.css"
import axios from "axios";

const AccountPage = ({}) => {
    const [timePeriod, setTimePeriod] = useState(Math.round(Date.now()/1000));
    const [AccountInfo, setAccountInfo] = useState({});
    const [filteredAccountInfo, setFilteredAccountInfo] = useState([]);
    
    const [user] = useAuth();

    const handleAccountInfo = async () => {
        try {
            const responce = await axios.get(`https://localhost:5001/api/SteamAPI/${user.steamAccountId}`)
            if(responce.status === 200){
                setAccountInfo(responce.data)
                console.log(responce.data)
            }
        } catch (error) {
            console.log("Error getting account info", error)
        }
    }

    const handleMatchInfo = async () => {
        
    }

    const filterAccountInfo = (matches) => {
        if(matches != null){
            const result = matches.filter((match) => match.start_time >= timePeriod)
            console.log(result)
            setFilteredAccountInfo(result)
        }
    }
    
    useEffect(() => {
        handleAccountInfo()
    }, []);

    useEffect(() => {
        if(AccountInfo != null && AccountInfo.result != null && AccountInfo.result.matches != null){
            filterAccountInfo(AccountInfo.result.matches)
        }
    }, [timePeriod]);

    return ( 
        <div className="account-page">
            <div>
                <h1 className="account-name" >{user.userName}</h1>
                <div className="account-info">
                    <div className="account-info-header">
                        <h3 className="header-box">Games this week: {filteredAccountInfo.length}</h3>
                        <div className="header-box time-selector">
                            <h3>Time Period:</h3>
                            <button onClick={() => setTimePeriod(Math.round(Date.now()/1000) - 86400)}>1 Day</button>
                            <button onClick={() => setTimePeriod(Math.round(Date.now()/1000) - 604800)}>1 Week</button>
                            <button onClick={() => setTimePeriod(Math.round(Date.now()/1000) - 2592000)}>1 Month</button>
                        </div>
                    </div>
                    <div className="account-info-body">
                        <AccountInfoDisplay label={"Total Damage Done"}/>
                        <AccountInfoDisplay label={"Total Kills"}/>
                        <AccountInfoDisplay label={"Total Tower Damage"}/>
                        <AccountInfoDisplay label={"Total Denies"}/>
                        <AccountInfoDisplay label={"Total Deaths"}/>
                        <AccountInfoDisplay label={"Total Healing"}/>
                        <AccountInfoDisplay label={"Total Last Hits"}/>
                        <AccountInfoDisplay label={"Total Assists"}/> 
                        <AccountInfoDisplay label={"Total Gold Earned"}/>
                    </div>
                </div>
            </div>
            <div className="sidebar">
                <h2>Friends</h2>
                <FriendsListEntrty/>
            </div>
        </div>
    );
}
 
export default AccountPage;