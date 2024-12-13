import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { getAdvice } from "../../utils/adviceApi";

function App() {
  const [advice, setAdvice] = useState("");

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

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main advice={advice} onRefresh={fetchAdvice} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
