import "./FriendMatchDetails.css"

const FriendMatchDetails = ({}) => {
    return ( 
        <div className="friends-match-details">
            <div>
                <div>
                    <p>Duration</p>
                    <p></p>
                </div>
                <div>
                    <p>Damage</p>
                    <p></p>
                </div>
                <div>
                    <p>Heal</p>
                    <p></p>
                </div>
                <div>
                    <p>Net worth</p>
                    <p></p>
                </div>
            </div>
            <div className="friend-hero-sidebar">
                <div className="hero-info">
                    <img src="" alt="" />
                    <p>Kills</p>
                    <p>Deaths</p>
                    <p>Assists</p>
                </div>
                <div className="items">
                    
                </div>
            </div>
        </div>
    );
}
 
export default FriendMatchDetails;