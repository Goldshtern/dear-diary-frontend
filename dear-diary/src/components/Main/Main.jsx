//import React from "react";
import "./Main.css";
function Main({ advice, onRefresh }) {
  return (
    <main className="main">
      <div className={`main__advice ${!advice ? "main__advice--loading" : ""}`}>
        <p className="main__advice-text">
          {advice ? `Advice: ${advice}` : "Loading advice..."}
        </p>
        <button
          className="main__advice-change-btn"
          type="button"
          onClick={onRefresh}
        >
          Refresh
        </button>
        <button className="main__advice-save-btn" type="submit">
          Save
        </button>
      </div>
    </main>
  );
}

export default Main;
