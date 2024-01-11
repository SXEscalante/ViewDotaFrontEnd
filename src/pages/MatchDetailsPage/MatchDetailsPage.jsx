import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import FriendMatchDetails from "../../components/FriendMatchDetails/FriendMatchDetails";

import "./MatchDetailsPage.css"

const MatchDetailsPage = ({}) => {
    const [matchInfo, setMatchInfo] = useState();
    const [result, setResult] = useState(0);
    const [heroId, setHeroId] = useState(0);
    const [kills, setKills] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [assists, setAssists] = useState(0);
    const [damage, setDamage] = useState(0);
    const [healing, setHealing] = useState(0);
    const [netWorth, setNetWorth] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const { matchId } = useParams();
    
    const [user] = useAuth();

    const handleMatchInfo = async () => {
        try {
            const responce = await axios.get(`https://localhost:5001/api/SteamAPI/match/${matchId}`)
            if(responce.status === 200){
                setMatchInfo(responce.data.result)
            }
        } catch (error) {
            console.log("Error getting account info", error)
        }
    }

    const filterPlayerInfo = () => {
        updatePlayerInfo(matchInfo.players.filter((player) => player.account_id == user.steamAccountId))
    }

    const updatePlayerInfo = (playerDetails) => {
        // determineMatchResult(playerDetails)
        setHeroId(playerDetails[0].hero_id)
        setKills(playerDetails[0].kills)
        setDeaths(playerDetails[0].deaths)
        setAssists(playerDetails[0].assists)
        setDamage(playerDetails[0].hero_damage)
        setHealing(playerDetails[0].hero_healing)
        setNetWorth(playerDetails[0].net_worth)
        setDuration(matchInfo.duration)

    }

    useEffect(() => {
        handleMatchInfo()
    }, []);

    useEffect(() => {
        if(matchInfo != null){
            filterPlayerInfo()
        }
    }, [matchInfo]);

    return ( 
        <div className="match-page">
            <div className="match-data">
                <div className="data-container">
                    <div className="data">
                        <p>Duration: </p>
                        <p>{duration}</p>
                    </div>
                    <div className="data">
                        <p>Damage: </p>
                        <p>{damage}</p>
                    </div>
                    <div className="data">
                        <p>Heal: </p>
                        <p>{healing}</p>
                    </div>
                    <div className="data">
                        <p>Net worth: </p>
                        <p>{netWorth}</p>
                    </div>
                    <br />
                    <FriendMatchDetails/>
                </div>
                <div className="match-sidebar">
                    <div className="hero-info">
                        <img src="" alt="" />
                        <p>{heroId}</p>
                        <p>Kills: {kills}</p>
                        <p>Deaths: {deaths}</p>
                        <p>Assists: {assists}</p>
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