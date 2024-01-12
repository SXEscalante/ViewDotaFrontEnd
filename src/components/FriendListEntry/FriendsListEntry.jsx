import "./FriendListEntry.css"

const FriendsListEntry = ({friend}) => {
    return ( 
        <div className="friend-container">
            <p>{friend.personaName}</p>
            <p>Games played together</p>
        </div>
    );
}
 
export default FriendsListEntry;