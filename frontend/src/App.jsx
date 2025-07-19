import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import api from "./services/api";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FormCreate from "./pages/FormCreate";
import FormSubmit from "./pages/FormSubmit";
import ResponseList from "./pages/ResponseList";
import ResponseSummary from "./pages/ResponseSummary";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.data))
      .catch(() => setUser(null))
      .finally(() => setLoadingAuth(false));
  }, []);

  if (loadingAuth) return <p>Loading…</p>;

  const isAdmin = user?.role === "admin";

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/dashboard"
          element={
            isAdmin ? <Dashboard /> : <Navigate to={user ? "/" : "/login"} />
          }
        />
        <Route
          path="/forms/create"
          element={isAdmin ? <FormCreate /> : <Navigate to="/" />}
        />
        <Route
          path="/forms/:id/responses"
          element={isAdmin ? <ResponseList /> : <Navigate to="/" />}
        />
        <Route
          path="/forms/:id/summary"
          element={isAdmin ? <ResponseSummary /> : <Navigate to="/" />}
        />

        <Route path="/forms/:id" element={<FormSubmit />} />
      </Routes>
    </Router>
  );
}
