import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.jpeg";
import Dropdown from "../Dropdown/Dropdown";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import "./Header.css";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  

  const navigate = useNavigate()

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);
    const token = localStorage.getItem("token")


    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
  const handleLogout = () => {
    // Clear the token from LocalStorage
    localStorage.removeItem('token');


    // Redirect the user to the login page
  navigate('/signin');
  };


  return (
    <header className="Header">
      <Link to="/">
        <img src={logo} className="Logo" alt="logo" />
      </Link>
      {(!isSmallScreen || isNavVisible) && (
        <nav className="Nav">
          <Dropdown />
          <NavLink
            to="/polls"
            className={({ isActive }) => (isActive ? "header-link-active" : "")}
          >
            Polls
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "header-link-active" : "")}
          >
            Products
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? "header-link-active" : "")}
          >
            Users
          </NavLink>
         
      
          {!localStorage.getItem("token") ? (
            <div>
              <NavLink
                to="/signin"
                className={({ isActive }) => (isActive ? "header-link-active" : "")}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? "header-link-active" : "")}
              >
                Sign Up
              </NavLink>
            </div>) :  <button onClick={handleLogout}>
            Logout
          </button>
          }
    
         
          <LanguageSelector />
        </nav>
      )}
      <button onClick={toggleNav} className="Burger">
        🍔
      </button>
    </header>
  );
}
