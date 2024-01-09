import FriendMatchDetails from "../../components/FriendMatchDetails/FriendMatchDetails";
import "./MatchDetailsPage.css"

const MatchDetailsPage = ({}) => {
    return ( 
        <div className="match-page">
            <div className="match-details">
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
                    <FriendMatchDetails/>  
                </div>
                <div className="sidebar">
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
            <div className="match-comments">
                <h2>Comments</h2>
                
            </div>
        </div>
    );
}
 
export default MatchDetailsPage;