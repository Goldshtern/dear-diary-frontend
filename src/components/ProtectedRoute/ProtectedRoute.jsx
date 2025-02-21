import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, setActiveModal, children }) {
  useEffect(() => {
    if (!isLoggedIn) {
      setActiveModal("login");
    }
  }, [isLoggedIn, setActiveModal]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
