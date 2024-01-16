import React from "react";
import { useEffect, useContext } from "react";
import FriendsListContext from "../../context/FriendsListContext";
import useAuth from "../../hooks/useAuth";

import search from "../../images/search.png";
import improve from "../../images/improve.png";
import message from "../../images/message.png";

import "./HomePage.css"

const HomePage = () => {
  const [user] = useAuth();
  const {handleFriendsListContext} = useContext(FriendsListContext)

  useEffect(() => {
    handleFriendsListContext()
  }, []);

  return (
    <div>
      <div className="hero"></div>
      <div className="home-footer">
        <div className="footer-images">
          <img className="home-image" src={search} alt="A magnifying glass with a bar graph inside" />
          <img className="home-image sparkle" src={improve} alt="3 Sparkles" />
          <img className="home-image" src={message} alt="A message window" />
        </div>
        <div className="footer-text">
          <p>Track your stats</p>
          <p>Improve your gameplay</p>
          <p>Message your friends</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
