import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

function setUserObject(user) {
  if (!user) {
    return null;
  }
  return {
    userName: user.userName,
    id: user.id,
    email: user.email,
    steamAccountId: user.steamAccountId,
    steamId: user.steamId,
  };
}

export const AuthProvider = ({ children }) => {
  const BASE_URL = "https://localhost:5001/api/authentication";
  const userToken = JSON.parse(localStorage.getItem("token"));
  const decodedUser = userToken ? jwtDecode(userToken) : null;
  const [token, setToken] = useState(userToken);
  const [user, setUser] = useState(setUserObject(decodedUser));
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();
  var bigInt = require('big-integer')
  let steamid64ident = bigInt(76561197960265728)

  const registerUser = async (registerData) => {
    try {
      let finalData = {
        userName: registerData.username,
        password: registerData.password,
        email: registerData.email,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        steamAccountId: registerData.steamAccountId,
        steamId: bigInt(registerData.steamAccountId).plus(steamid64ident)
      };
      let response = await axios.post(`${BASE_URL}`, finalData);
      if (response.status === 201) {
        console.log("Successful registration! Log in to access token");
        setIsServerError(false);
        navigate("/login");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (loginData) => {
    try {
      let response = await axios.post(`${BASE_URL}/login`, loginData);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.access));
        setToken(JSON.parse(localStorage.getItem("token")));
        let loggedInUser = jwtDecode(response.data.access);
        setUser(setUserObject(loggedInUser));
        setIsServerError(false);
        
        navigate("/");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error);
      setIsServerError(true);
    }
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem("token");
      localStorage.removeItem("friendsList");
      setUser(null);
      setToken(null);
      navigate("/");
    }
  };

  const contextData = {
    user,
    token,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
