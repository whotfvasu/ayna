import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadForms = async () => {
      try {
        const res = await api.get("/forms");
        setForms(res.data.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError(err.response?.data?.error || "Failed to load forms");
        }
      }
    };
    loadForms();
  }, [navigate]);

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h2>My Feedback Forms</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        <Link to="/forms/create">+ Create New Form</Link>
      </p>
      <ul>
        {forms.map((f) => (
          <li key={f._id}>
            <Link to={`/forms/${f._id}`}>{f.title}</Link>{" "}
            <small>({new Date(f.createdAt).toLocaleDateString()})</small>
          </li>
        ))}
      </ul>
      {forms.length === 0 && <p>No forms yet.</p>}
    </div>
  );
}
