import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddDiaryModal from "../AddDiaryModal/AddDiaryModal";
import { getAdvice } from "../../utils/adviceApi";

function App() {
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [name, setName] = useState("");
  const [diaryText, setDiaryText] = useState("");

  const fetchAdvice = () => {
    getAdvice()
      .then((data) => {
        setAdvice(data.slip.advice);
      })
      .catch((err) => console.error("Error fetching advice data:", err));
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "diaryText") {
      setDiaryText(value);
    }
  };

  const handleAboutToggle = () => {
    setAboutOpen(!isAboutOpen);
  };

  const handleAddClick = () => {
    setActiveModal("+ Add diary page");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeActiveModal();
    }
  };

  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header
            isAboutOpen={isAboutOpen}
            handleAboutToggle={handleAboutToggle}
            handleAddClick={handleAddClick}
          />
          <Routes>
            <Route
              path="/"
              element={<Main advice={advice} onRefresh={fetchAdvice} />}
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
        {activeModal && (
          <div className="modal" onClick={handleOverlayClick}>
            <AddDiaryModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              name={name}
              diaryText={diaryText}
              handleInputChange={handleInputChange}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
