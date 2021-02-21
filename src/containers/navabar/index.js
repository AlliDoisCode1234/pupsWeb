import React, { useState, useContext, useRef, useEffect } from "react";
import "./style.css";
import { SignInBtn } from "../../components";
import { UserContext } from "../../contexts/user";
import logo from './img/logo.png';



/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} el
 * @param {boolean} initialState
 */

const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = e => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};

export default function Navbar() {
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
    <div className="navbar">
      <img id="mainLogo" className="mainLogo" src={logo} alt="Pups Logo" onClick={onclick}/>
      {user ? (
        
      <div className="menu-container">
        <button onClick={onclick} className="menu-trigger">
          <span>{user.displayName}</span>
          <img className="navbar__img" src={user.photoURL} alt="user avatar"/>
        </button>
        <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
          <ul>
            <li><a href="/messages">Messages</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/account">Account</a></li>
          </ul>
        </nav>
      </div>
      ) : (
        <SignInBtn />
      )}
      
    </div>
  );
}
