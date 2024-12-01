import React from "react";
import "./Header.css";
import logo from "../../assets/logo-diary.png";
import avatar from "../../assets/avatar.png";
import About from "../About/About";

function Header() {
  const [isAboutOpen, setAboutOpen] = React.useState(false);

  const handleAboutToggle = () => {
    setAboutOpen(!isAboutOpen);
  };
  return (
    <header className="header">
      <div className="header__logo-and-title">
        <img className="header__logo" src={logo} alt="Diary Logo" />
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
        <button type="button" className="header__add-diary-page-btn">
          + Add diary page
        </button>
        <div className="header__user-container">
          <p className="header__username">Aleksandr Goldshtern</p>
          <img className="header__avatar" src={avatar} alt="User Avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
