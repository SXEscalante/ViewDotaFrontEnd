import "./FriendMatchDetails.css"

import heroes from "../../data/DotaHeroes";
import { useEffect, useState } from "react";

const FriendMatchDetails = ({details}) => {
    const [playedHero, setPlayedHero] = useState({});

    useEffect(() => {
        const playedHeroObj = heroes.filter((hero) => hero.heroId == details.friendsMatchDetails.hero_id)
        setPlayedHero(playedHeroObj[0])    
    }, []);

    return ( 
        <div className="friends-match-details">
            <div className="friends-details">
                <h3 className="friends-name">{details.personaName}</h3>
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
                    {playedHero &&
                        <img src={playedHero.img} alt="" className="friends-hero"/>}
                <div className="friend-hero-info">
                    <p>{`Kills: ${details.friendsMatchDetails.kills}`}</p>
                    <p>{`Deaths: ${details.friendsMatchDetails.deaths}`}</p>
                    <p>{`Assists: ${details.friendsMatchDetails.assists}`}</p>
                </div>
                <div className="friends-items">
                    
                </div>
            </div>
        </div>
    );
}
 
export default FriendMatchDetails;