import { useEffect, useState } from "react";
import AccountInfoDisplay from "../../components/AccountInfoDisplay/AccountInfoDisplay";
import FriendsListEntrty from "../../components/FriendListEntry/FriendsListEntry";

import "./AccountPage.css"

const AccountPage = ({}) => {
    const [timePeriod, setTimePeriod] = useState(Math.round(Date.now()/1000));



    return ( 
        <div className="account-page">
            <div>
                <h1 className="account-name" >Username</h1>
                <p>{Math.round(timePeriod)}</p>
                <div className="account-info">
                    <div className="account-info-header">
                        <h3 className="header-box">Games this week: 0</h3>
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