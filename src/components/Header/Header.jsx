import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo-diary.png";
import { Link } from "react-router-dom";
import About from "../About/About";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  isAboutOpen,
  handleAboutToggle,
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  handleSignOutClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

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
        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-diary-page-btn"
          >
            + Add diary page
          </button>
        )}

        {currentUser && currentUser.name ? (
          <Link to="/profile">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              <img
                className="header__avatar"
                src={currentUser.avatarUrl}
                alt={currentUser.name}
              />
            </div>
          </Link>
        ) : (
          <>
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
          </>
        )}

        {isLoggedIn && (
          <button
            onClick={handleSignOutClick}
            type="button"
            className="header__sign-out-btn"
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
