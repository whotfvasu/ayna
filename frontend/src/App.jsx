import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FormCreate from "./pages/FormCreate";
import FormSubmit from "./pages/FormSubmit";

export default function App() {
  const isAuth = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/forms/create"
          element={isAuth ? <FormCreate /> : <Navigate to="/login" />}
        />
        <Route path="/forms/:id" element={<FormSubmit />} />
      </Routes>
    </Router>
  );
}
