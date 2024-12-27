import React from "react";
import Preloader from "../Preloader/Preloader";
import "./Main.css";

function Main({ advice, onRefresh }) {
  const isLoading = !advice;

  return (
    <main className="main">
      <div
        className={`main__advice ${isLoading ? "main__advice--loading" : ""}`}
      >
        {isLoading ? (
          <>
            <Preloader />
            <p className="main__advice-text">Loading advice...</p>
          </>
        ) : (
          <p className="main__advice-text">Guru Advices: {advice}</p>
        )}
        <button
          className="main__advice-change-btn"
          type="button"
          onClick={onRefresh}
        >
          Refresh
        </button>
      </div>
    </main>
  );
}

export default Main;
