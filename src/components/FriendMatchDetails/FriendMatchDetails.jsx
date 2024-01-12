import "./FriendMatchDetails.css"

const FriendMatchDetails = ({details}) => {
    console.log(details)
    return ( 
        <div className="friends-match-details">
            <div>
                <h3>{details.personaName}</h3>
                <div className="data">
                    <p>Damage: </p>
                    <p>{details.friendsMatchDetails.hero_damage}</p>
                </div>
                <div className="data">
                    <p>Heal: </p>
                    <p>{details.friendsMatchDetails.hero_healing}</p>
                </div>
                <div className="data">
                    <p>Net worth: </p>
                    <p>{details.friendsMatchDetails.net_worth}</p>
                </div>
            </div>
            <div className="friend-hero-sidebar">
                <div className="hero-info">
                    <img src="" alt="" />
                    <p>{`Kills: ${details.friendsMatchDetails.kills}`}</p>
                    <p>{`Deaths: ${details.friendsMatchDetails.deaths}`}</p>
                    <p>{`Assists: ${details.friendsMatchDetails.assists}`}</p>
                </div>
                <div className="items">
                    
                </div>
            </div>
        </div>
    );
}
 
export default FriendMatchDetails;