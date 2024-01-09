import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

import search from "../../images/search.png";
import improve from "../../images/improve.png";
import message from "../../images/message.png";

import "./HomePage.css"

const HomePage = () => {
  const [user, token] = useAuth();


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
