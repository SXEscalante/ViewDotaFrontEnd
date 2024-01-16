import { useNavigate } from "react-router-dom";

import "./FriendListEntry.css"
import { useEffect, useState } from "react";

const FriendsListEntry = ({friend}) => {
    const [safePersonaName, setSafePersonaName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let userName = ""
        if(friend.personaName == "Vehicular Manslaughter"){
            userName = "Geecie"
        }
        else if(friend.personaName == "yungmeat"){
            userName = "Barto"
        }
        else{
            userName = friend.personaName
        }
        setSafePersonaName(userName)
    }, [friend]);

    return ( 
        <div className="friend-container" onClick={() => navigate(`/friendsAccount/${friend.accountId}`)}>
            <p>{safePersonaName}</p>
            <p>{`Games played together: ${friend.recentGames}`}</p>
        </div>
    );
}
 
export default FriendsListEntry;