import { useContext, useEffect, useState } from "react";
import { FriendsListContext } from "../../context/FriendsListContext";
import axios from "axios";
import useAuth from "../../hooks/useAuth";


import MatchRow from "../../components/MatchRow/MatchRow";

import "./MatchHistoryPage.css"

const MatchHistoryPage = ({friendsList}) => {
    const [sortingId, setSortingId] = useState(-1);
    const [matches, setMatches] = useState([]);
    const [matchObjs, setMatchObjs] = useState([]);

    const [user] = useAuth();
    const friendIdList = useContext(FriendsListContext)

    const handleMatchHistory = async () => {
        try {
            const response = await axios.get(`https://localhost:5001/api/SteamAPI/account/${user.steamAccountId}`)
            if(response.status === 200){
                const matchObjsData = await Promise.all(response.data.result.matches.map((match) => handleMatchInfo(match.match_id)))
                setMatchObjs(matchObjsData)
            }
        } catch (error) {
            console.log("Error getting account info", error)
        }
    }

    const handleMatchInfo = async (matchId) => {
        try {
            const response = await axios.get(`https://localhost:5001/api/SteamAPI/match/${matchId}`)
            if(response.status === 200){
                return response.data
            }
        } catch (error) {
            console.log("Error getting account info", error)
        }
    }
    
    useEffect(() => {
        handleMatchHistory()
        console.log("friendslist", friendIdList)
    }, []);

    useEffect(() => {
        if(matchObjs != null){
            setMatches(matchObjs.map((match, i) => <MatchRow key={i} matchObj={match} friendsList={friendsList}/>))
        }
        console.log("matchObjs", matchObjs)
    }, [matchObjs]);

    return ( 
        <div className="match-history">
            <table className="match-table">
                <thead>
                    <tr>
                        <th>Result<button onClick={() => setSortingId(1)}></button></th>
                        <th>K/D/A</th>
                        <th>KDA</th>
                        <th>Damage</th>
                        <th>Healing</th>
                        <th>Net Worth</th>
                        <th className="duration">Duration</th>
                        <th className="friends">Friends</th>
                    </tr>
                </thead>
                <tbody>{matches}</tbody>
            </table>
            <a href="/match/10">Details</a>
        </div>
    );
}
 
export default MatchHistoryPage;