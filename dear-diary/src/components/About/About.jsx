import React from "react";
import "./About.css";

function About({ isOpen, onClose }) {
  return (
    <div className={`about ${isOpen ? "about--open" : ""}`}>
      <div className="about__content">
        <button className="about__close-btn" onClick={onClose}>
          ✖
        </button>
        <h2 className="about__title">Welcome to Dear Diary</h2>
        <p className="about__text">Remember your impressions and feelings.</p>
      </div>
    </div>
  );
}

export default About;
