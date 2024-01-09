
const NavBarDropdown = ({username, logoutUser}) => {
    return ( 
        <div>
            <button>{`Welcome ${username.userName}`}</button>
            <div className="content">
                <a className='menu-option favorites' href="/account">Account</a>
                <a className='menu-option favorites' href="/matches">Matches</a>
                <p className='menu-option logout' onClick={logoutUser}>Logout</p>
            </div>
        </div>
    );
}
 
export default NavBarDropdown;