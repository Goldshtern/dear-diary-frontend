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
import SuccessModal from "../SuccessModal/SuccessModal";
import { getAdvice } from "../../utils/adviceApi";
import { getPages, postPages } from "../../utils/api";
import { signUp, signIn, getUserInfo } from "../../utils/MainApi";
import { getToken, removeToken } from "../../utils/token";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("");
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
  const [errorMessage, setErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const navigate = useNavigate();

  const fetchAdvice = () => {
    getAdvice()
      .then((data) => setAdvice(data.slip.advice))
      .catch((err) => console.error("Error fetching advice:", err));
  };

  useEffect(() => {
    fetchAdvice();

    getPages()
      .then((data) => {
        setDiaryEntries(data);
      })
      .catch((err) => {
        console.error("Error fetching diary pages:", err);
      });
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
    const token = getToken();
    setIsLoading(true);

    const newDiaryEntry = {
      title: diaryTitle,
      text: diaryText,
      imageUrl: imageUrl,
      token,
    };

    return postPages(
      newDiaryEntry.title,
      newDiaryEntry.text,
      newDiaryEntry.imageUrl
    )
      .then((addedEntry) => {
        setDiaryEntries((prevEntries) =>
          Array.isArray(prevEntries)
            ? [...prevEntries, addedEntry]
            : [addedEntry]
        );

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

  const handleLoginClickFromSuccess = () => {
    setIsSuccessModalOpen(false);
    setActiveModal("login");
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

  useEffect(() => {
    const token = getToken();
    if (token) {
      getUserInfo(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          setActiveModal("");
        })
        .catch(() => {
          removeToken();
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      setLoginErrorMessage("Email and password are required.");
      return Promise.reject(new Error("Missing credentials"));
    }

    setIsLoading(true);
    setLoginErrorMessage("");

    return signIn({ email, password })
      .then((userData) => {
        localStorage.setItem("jwt", userData.token);
        setCurrentUser(userData.user);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setLoginErrorMessage(
          err.message || "Failed to log in. Please try again."
        );
        return Promise.reject(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleRegistration = ({ name, avatarUrl, email, password }) => {
    setIsLoading(true);
    setErrorMessage("");

    return signUp({ name, avatarUrl, email, password })
      .then(() => {
        setIsSuccessModalOpen(true);
      })
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          "Something went wrong. Please try again.";
        setErrorMessage(message);
        return Promise.reject(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSignOutClick = () => {
    removeToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header
            isAboutOpen={isAboutOpen}
            handleAboutToggle={() => setAboutOpen(!isAboutOpen)}
            handleAddClick={() => setActiveModal("addDiary")}
            handleRegisterClick={handleRegisterClick}
            handleLoginClick={handleLoginClick}
            isLoggedIn={isLoggedIn}
            handleSignOutClick={handleSignOutClick}
          />
          <Routes>
            <Route
              path="/"
              element={<Main advice={advice} onRefresh={fetchAdvice} />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  setActiveModal={setActiveModal}
                >
                  <Profile diaryEntries={diaryEntries} />
                </ProtectedRoute>
              }
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
                errorMessage={errorMessage}
              />
            )}
            {activeModal === "login" && (
              <LoginModal
                activeModal={activeModal}
                handleCloseClick={closeActiveModal}
                formData={formData || { email: "", password: "" }}
                handleInputChange={handleInputChange}
                handleLogin={handleLogin}
                loginErrorMessage={loginErrorMessage}
              />
            )}
          </div>
        )}
        {isSuccessModalOpen && (
          <SuccessModal
            message="You have successfully registered!"
            onClose={() => setIsSuccessModalOpen(false)}
            onLoginClick={handleLoginClickFromSuccess}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
