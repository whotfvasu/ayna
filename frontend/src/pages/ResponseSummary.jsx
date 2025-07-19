import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ResponseSummary() {
  const { id: formId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/feedback/form/${formId}/summary`);
        setData(res.data.data);
      } catch (err) {
        if (err.response?.status === 401) return navigate("/login");
        setError(err.response?.data?.error || "Failed to load summary");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [formId, navigate]);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading summary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card">
          <p className="text-error">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container">
        <div className="card">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const { totalResponses, summary } = data;

  return (
    <div className="container">
      <div className="card">
        <div className="flex-between mb-6">
          <h2 className="title">Response Summary</h2>
          <div className="flex flex-gap">
            <Link
              to={`/forms/${formId}/responses`}
              className="btn btn-secondary btn-small"
            >
              ← View All Responses
            </Link>
            <Link to="/dashboard" className="btn btn-secondary btn-small">
              Dashboard
            </Link>
          </div>
        </div>

        <div
          className="mb-6"
          style={{
            padding: "1.5rem",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <p style={{ fontSize: "1.125rem", color: "#374151" }}>
            Total responses:{" "}
            <strong style={{ color: "#1f2937" }}>{totalResponses}</strong>
          </p>
        </div>

        {Object.entries(summary).map(([question, counts], qi) => (
          <div key={qi} className="mb-6">
            <h3 className="subtitle">{question}</h3>
            <div className="card" style={{ padding: 0, marginTop: "1rem" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Answer</th>
                    <th style={{ width: "100px" }}>Count</th>
                    <th style={{ width: "150px" }}>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(counts)
                    .sort(([, a], [, b]) => b - a) // Sort by count descending
                    .map(([answer, count], ai) => {
                      const percentage = Math.round(
                        (count / totalResponses) * 100
                      );
                      return (
                        <tr key={ai}>
                          <td
                            style={{
                              maxWidth: "300px",
                              wordWrap: "break-word",
                            }}
                          >
                            {answer}
                          </td>
                          <td>
                            <strong>{count}</strong>
                          </td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <div
                                style={{
                                  width: "80px",
                                  height: "8px",
                                  backgroundColor: "#e5e7eb",
                                  borderRadius: "4px",
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  style={{
                                    width: `${percentage}%`,
                                    height: "100%",
                                    backgroundColor: "#4f46e5",
                                    borderRadius: "4px",
                                  }}
                                ></div>
                              </div>
                              <span
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                }}
                              >
                                {percentage}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
