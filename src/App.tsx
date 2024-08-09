import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/ProtectedRoute";

import { Home } from "./screens/Home";
import { SignIn } from "./screens/SignIn";
import { Dashboard } from "./screens/Dashboard";

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashbord" element={<Dashboard />} />
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};
