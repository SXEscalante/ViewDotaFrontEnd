import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import MatchRow from "../../components/MatchRow/MatchRow";

import "./MatchHistoryPage.css"

const MatchHistoryPage = ({}) => {
    const [matchHistory, setMatchHistory] = useState();
    const [matches, setMatches] = useState([]);

    const [user] = useAuth();

    const handleMatchHistory = async () => {
        try {
            const responce = await axios.get(`https://localhost:5001/api/SteamAPI/account/${user.steamAccountId}`)
            if(responce.status === 200){
                setMatchHistory(responce.data)
            }
        } catch (error) {
            console.log("Error getting account info", error)
        }
    }
    
    useEffect(() => {
        handleMatchHistory()
    }, []);

    useEffect(() => {
        if(matchHistory != null && matchHistory.result.matches != null){
            setMatches(matchHistory.result.matches.map((match, i) => <MatchRow key={i} matchId={match.match_id}/>))
        }
    }, [matchHistory]);

    return ( 
        <div className="match-history">
            <table className="match-table">
                <thead>
                    <tr>
                        <th>Result</th>
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