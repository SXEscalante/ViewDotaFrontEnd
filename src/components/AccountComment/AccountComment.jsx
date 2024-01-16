const AccountComment = ({comment}) => {
    return ( 
        <div>
            <h3>{comment.user.username}</h3>
            <p>{comment.text}</p>
        </div>
    );
}
 
export default AccountComment;