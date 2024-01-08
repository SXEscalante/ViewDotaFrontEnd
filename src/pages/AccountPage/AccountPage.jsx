import AccountInfoDisplay from "../../components/AccountInfoDisplay/AccountInfoDisplay";

import "./AccountPage.css"

const AccountPage = ({}) => {
    return ( 
        <div>
            <h1>Username</h1>
            <div>
                <div className="account-info">
                    <div className="account-info-header">
                        <h3 className="header-box">Games this week: 0</h3>
                        <h3 className="header-box">Time Period</h3>
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
        </div>
    );
}
 
export default AccountPage;