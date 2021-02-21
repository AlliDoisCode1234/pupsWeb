import React, { useState, useContext } from "react";
import "./style.css";
import { storage, db } from "../../firebase";
import { UserContext } from "../../contexts/user";





export default function StoryDisplay({
  profileUrl,
  username,
}) {
  const [user, setUser] = useContext(UserContext).user;

  
  
  return (
    <div className="storyDisplay">
      <div className="storyDisplay__header">
        <div className="storyDisplay__headerLeft">
          <img className="storyDisplay__profilePic" src={profileUrl} />
          <p style={{ marginLeft: "8px" }}>{username}</p>
        </div>
      </div>
    </div>

  );
}