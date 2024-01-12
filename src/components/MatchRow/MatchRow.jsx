import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import "./MatchRow.css"

const MatchRow = ({matchId, friendsList}) => {
    const [matchInfo, setMatchInfo] = useState();
    
    const [result, setResult] = useState(0);
    const [heroId, setHeroId] = useState(0);
    const [kills, setKills] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [assists, setAssists] = useState(0);
    const [kda, setKda] = useState(0);
    const [damage, setDamage] = useState(0);
    const [healing, setHealing] = useState(0);
    const [netWorth, setNetWorth] = useState(0);
    const [duration, setDuration] = useState(0);
    const [friends, setFriends] = useState();
    const [friendsInMatch, setFriendsInMatch] = useState([]);

    const [user] = useAuth();

    const navigate = useNavigate();
    
    const handleMatchInfo = async () => {
        try {
            const responce = await axios.get(`https://localhost:5001/api/SteamAPI/match/${matchId}`)
            if(responce.status === 200){
                setMatchInfo(responce.data)
            }
        } catch (error) {
            console.log("Error getting account info", error)
        }
    }

    const filterPlayerInfo = (matchInfo) => {
        updateMatchInfo(matchInfo.result.players.filter((player) => player.account_id == user.steamAccountId))
        let tempFriendsInMatch = [];
        for(var friend of friendsList){
            const friendInMatch = (matchInfo.result.players.filter((player) => player.account_id == friend.accountId))
            if(friendInMatch.length > 0){
                tempFriendsInMatch.push(friend.personaName);
            }
        }
        setFriendsInMatch(tempFriendsInMatch.map((friend) => <p className="match-history-friends">{friend}</p>))
    }

    const updateMatchInfo = (playerDetails) => {
        determineMatchResult(playerDetails)
        setHeroId(playerDetails[0].hero_id)
        setKills(playerDetails[0].kills)
        setDeaths(playerDetails[0].deaths)
        setAssists(playerDetails[0].assists)
        setKda((playerDetails[0].kills + playerDetails[0].assists) / playerDetails[0].deaths)
        setDamage(playerDetails[0].hero_damage)
        setHealing(playerDetails[0].hero_healing)
        setNetWorth(playerDetails[0].net_worth)
        setDuration(matchInfo.result.duration)
    }

    const determineMatchResult = (playerDetails) => {
        if(playerDetails[0].team_number === 0 && matchInfo.result.radiant_win === true){
            setResult(1)
        }
        else if(playerDetails[0].team_number === 1 && matchInfo.result.radiant_win === false) {
            setResult(1)
        }
        else {
            setResult(0)
        }
    }

    useEffect(() => {
        handleMatchInfo();
    }, []);

    useEffect(() => {
        if(matchInfo != null){
            filterPlayerInfo(matchInfo)
        }
    }, [matchInfo]);

    useEffect(() => {
        console.log(friendsInMatch)
    }, [friendsInMatch]);

    return ( 
            <tr onClick={() => navigate(`/match/${matchId}`)}>
                <div className="result">
                    <td className={result ? "win" : "loss"}>{result ? "Win" : "Loss"}</td>
                        <p>{heroId}</p>
                </div>
                <td>{`${kills}/${deaths}/${assists}`}</td>
                <td>{Math.round((kda * 10)) / 10}</td>
                <td>{damage}</td>
                <td>{healing}</td>
                <td>{netWorth}</td>
                <td>{duration}</td>
                <td>{friendsInMatch}</td>
            </tr>
    );
}
 
export default MatchRow;