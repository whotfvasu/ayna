import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    window.location.href = "/login";
  };

  useEffect(() => {
    const loadForms = async () => {
      try {
        const res = await api.get("/forms");
        setForms(res.data.data);
      } catch (err) {
        if (err.response?.status === 401) return navigate("/login");
        setError(err.response?.data?.error || "Failed to load forms");
      } finally {
        setLoading(false);
      }
    };
    loadForms();
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading your forms...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h2 className="title">My Feedback Forms</h2>
          <button
            onClick={handleLogout}
            className="btn btn-secondary btn-small"
          >
            Sign Out
          </button>
        </div>

        {error && <p className="text-error mb-4">{error}</p>}

        <div className="mb-6">
          <Link to="/forms/create" className="btn btn-primary">
            + Create New Form
          </Link>
        </div>

        {forms.length === 0 ? (
          <div className="text-center" style={{ padding: "3rem 0" }}>
            <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
              No forms created yet
            </p>
            <p className="text-sm" style={{ color: "#9ca3af" }}>
              Create your first feedback form to get started
            </p>
          </div>
        ) : (
          <div
            className="card"
            style={{ padding: 0, border: "1px solid #e5e7eb" }}
          >
            {forms.map((form) => (
              <div key={form._id} className="list-item">
                <div>
                  <h3
                    className="subtitle"
                    style={{ marginBottom: "0.25rem", fontSize: "1.125rem" }}
                  >
                    {form.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>
                    Created {new Date(form.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-gap">
                  <Link
                    to={`/forms/${form._id}/responses`}
                    className="btn btn-secondary btn-small"
                  >
                    View Responses
                  </Link>
                  <Link
                    to={`/forms/${form._id}`}
                    className="btn btn-primary btn-small"
                    target="_blank"
                  >
                    Public Link
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
