import React from "react";
import "./Header.css";
import logo from "../../assets/logo-diary.png";
import avatar from "../../assets/avatar.png";
import About from "../About/About";
import { Link } from "react-router-dom";

function Header({
  isAboutOpen,
  handleAboutToggle,
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
}) {
  return (
    <header className="header">
      <div className="header__logo-and-title">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Diary Logo" />
        </Link>
        <div className="header__title-container">
          <h1 className="header__title">My Dear, Diary!</h1>
          <p className="header__date">
            {new Date().toLocaleString("default", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="header__actions">
        <div className="header__about-wrapper">
          <button className="header__about-btn" onClick={handleAboutToggle}>
            About
          </button>
          <About isOpen={isAboutOpen} onClose={handleAboutToggle} />
        </div>
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-diary-page-btn"
        >
          + Add diary page
        </button>
        <button
          onClick={handleRegisterClick}
          type="button"
          className="header__register-btn"
        >
          Register
        </button>
        <button
          onClick={handleLoginClick}
          type="button"
          className="header__register-btn"
        >
          Login
        </button>
        <Link to="/profile">
          <div className="header__user-container">
            <p className="header__username">Aleksandr Goldshtern</p>
            <img className="header__avatar" src={avatar} alt="User Avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
