import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { SignIn } from "./screens/SignIn";
import { Dashboard } from "./screens/Dashboard";
import { AuthProvider } from "./context/auth";
import { PrivateRoute } from "./components/ProtectedRoute";
import { NotFound } from "./screens/NotFound";
import { Inhabitant } from "./screens/Inhabitant";
import { Order } from "./screens/Order";
import { Community } from "./screens/Community";

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<SignIn />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/pedidos" element={<Order />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/habitantes" element={<Inhabitant />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/community" element={<Community />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};
