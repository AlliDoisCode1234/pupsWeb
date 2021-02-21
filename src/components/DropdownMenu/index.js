import React, { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../../contexts/user";


export default function DropdownMenu () {
    const [user, setUser] = useContext(UserContext).user;
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    useEffect(() => {
        const pageClickEvent = (e) => {
            console.log(e);
        };

        // If the item is active (ie open) then listen for clicks
        if (isActive) {
            window.addEventListener('click', pageClickEvent);
        }

        return () => {
            window.removeEventListener('click', pageClickEvent);
        }

    }, [isActive]);
  
    return (
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>User</span>
          <img className="navbar__img" src={user.photoURL} alt="user avatar"/>
        </button>
        <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
          <ul>
            <li><a href="/messages">Messages</a></li>
            <li><a href="/trips">Trips</a></li>
            <li><a href="/saved">Saved</a></li>
          </ul>
        </nav>
      </div>
    );
  };

 
  