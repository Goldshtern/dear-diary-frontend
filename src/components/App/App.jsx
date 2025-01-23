import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddDiaryModal from "../AddDiaryModal/AddDiaryModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../Login/LoginModal";
import { getAdvice } from "../../utils/adviceApi";
import { getPages, postPages } from "../../utils/api";
import { signUp, signIn } from "../../utils/auth";

function App() {
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryText, setDiaryText] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const fetchAdvice = () => {
    getAdvice()
      .then((data) => setAdvice(data.slip.advice))
      .catch((err) => console.error("Error fetching advice:", err));
  };

  useEffect(() => {
    fetchAdvice();
    getPages()
      .then((data) => setDiaryEntries(data))
      .catch((err) => console.error("Error fetching diary pages:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "diaryTitle") {
      setDiaryTitle(value);
    } else if (name === "diaryText") {
      setDiaryText(value);
    } else if (name === "imageUrl") {
      setImageUrl(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddDiary = () => {
    setIsLoading(true);

    const newDiaryEntry = {
      _id: Date.now(),
      title: diaryTitle,
      text: diaryText,
      imageUrl: imageUrl,
    };

    return postPages(
      newDiaryEntry.title,
      newDiaryEntry.text,
      newDiaryEntry.imageUrl
    )
      .then(() => {
        setDiaryEntries((prevEntries) => [...prevEntries, newDiaryEntry]);
        setDiaryTitle("");
        setDiaryText("");
        setImageUrl("");
        closeActiveModal();
      })
      .catch((err) => console.error("Error adding new item:", err))
      .finally(() => setIsLoading(false));
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

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeActiveModal();
    }
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

  const handleRegistration = ({ name, avatarUrl, email, password }) => {
    setIsLoading(true);
    console.log("Attempting to register:", {
      name,
      avatarUrl,
      email,
      password,
    });
    return signUp({ name, avatarUrl, email, password })
      .then((response) => {
        console.log("Registration successful:", response);
        handleLogin({ email, password });
      })
      .catch((err) => console.error("Error during registration:", err))
      .finally(() => setIsLoading(false));
  };

  const handleLogin = ({ email, password }) => {
    console.log("Attempting to log in with:", { email, password });
    if (!email || !password) {
      return;
    }

    setIsLoading(true);
    return signIn({ email, password })
      .then((userData) => {
        console.log("Login successful:", userData);
        setCurrentUser(userData.user);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.error("Login failed:", err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header
          isAboutOpen={isAboutOpen}
          handleAboutToggle={() => setAboutOpen(!isAboutOpen)}
          handleAddClick={() => setActiveModal("addDiary")}
          handleRegisterClick={handleRegisterClick}
          handleLoginClick={handleLoginClick}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={<Main advice={advice} onRefresh={fetchAdvice} />}
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
              diaryTitle={diaryTitle}
              diaryText={diaryText}
              imageUrl={imageUrl}
              handleInputChange={handleInputChange}
              handleAddDiary={handleAddDiary}
              isLoading={isLoading}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              formData={formData}
              handleInputChange={handleInputChange}
              handleRegistration={handleRegistration}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              formData={formData || { email: "", password: "" }}
              handleInputChange={handleInputChange}
              handleLogin={handleLogin}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
