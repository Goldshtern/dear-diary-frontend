import React, { useState, useEffect } from "react";
import { Routes, Route, data } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddDiaryModal from "../AddDiaryModal/AddDiaryModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../Login/LoginModal";
import { getAdvice } from "../../utils/adviceApi";
import { getPages } from "../../utils/api";

function App() {
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
  });
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [diaryName, setDiaryName] = useState("");
  const [diaryText, setDiaryText] = useState("");

  const fetchAdvice = () => {
    getAdvice()
      .then((data) => {
        setAdvice(data.slip.advice);
      })
      .catch((err) => console.error("Error fetching advice data:", err));
  };

  useEffect(() => {
    getAdvice()
      .then((data) => setAdvice(data.slip.advice))
      .catch((err) => console.error("Error fetching advice data:", err));

    getPages()
      .then((data) => setDiaryEntries(data))
      .catch((err) => console.error("Error fetching diary pages:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "email" ||
      name === "password" ||
      name === "name" ||
      name === "avatarUrl"
    ) {
      setCurrentUser((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (name === "diaryName") {
      setDiaryName(value);
    } else if (name === "diaryText") {
      setDiaryText(value);
    }
  };

  const handleAboutToggle = () => {
    setAboutOpen((prevState) => !prevState);
  };

  const handleAddClick = () => {
    setActiveModal("addDiary");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
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

  const handleAddDiary = () => {
    const newDiaryEntry = {
      _id: Date.now(),
      name: diaryName,
      text: diaryText,
    };
    setDiaryEntries((prevEntries) => [...prevEntries, newDiaryEntry]);
    setDiaryName("");
    setDiaryText("");
    closeActiveModal();
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header
          isAboutOpen={isAboutOpen}
          handleAboutToggle={handleAboutToggle}
          handleAddClick={handleAddClick}
          handleRegisterClick={handleRegisterClick}
          handleLoginClick={handleLoginClick}
        />
        <Routes>
          <Route
            path="/"
            element={<Main advice={advice} onRefresh={() => fetchAdvice()} />}
          />
          <Route
            path="/profile"
            element={<Profile diaryEntries={diaryEntries} />}
          />
        </Routes>
        <Footer />
      </div>

      {activeModal && (
        <div className="modal" onClick={handleOverlayClick}>
          {activeModal === "addDiary" && (
            <AddDiaryModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              diaryName={diaryName}
              diaryText={diaryText}
              handleInputChange={handleInputChange}
              handleAddDiary={handleAddDiary}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              formData={currentUser}
              handleInputChange={handleInputChange}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              formData={currentUser}
              handleInputChange={handleInputChange}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
