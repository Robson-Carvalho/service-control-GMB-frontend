import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Home } from "./screens/Home";
import { SignIn } from "./screens/SignIn";
import { Dashboard } from "./screens/Dashboard";
import { AuthProvider } from "./context/auth";
import { PrivateRoute } from "./components/ProtectedRoute";
import { NotFound } from "./screens/NotFound";

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};
