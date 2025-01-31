import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, setActiveModal, children }) {
  if (!isLoggedIn) {
    setActiveModal("login");
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
