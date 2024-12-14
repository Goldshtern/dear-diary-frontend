import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { getAdvice } from "../../utils/adviceApi";

function App() {
  const [advice, setAdvice] = useState("");
  const [activeModal, setActiveModal] = useState("");

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

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Main advice={advice} onRefresh={fetchAdvice} />}
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </div>
      <ModalWithForm
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
      />
    </>
  );
}

export default App;
