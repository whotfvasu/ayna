import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function ResponseList() {
  const { id: formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/feedback/form/${formId}`);
        setResponses(res.data.data);
      } catch (err) {
        if (err.response?.status === 401) return navigate("/login");
        setError(err.response?.data?.error || "Failed to load responses");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [formId, navigate]);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading responses...</p>
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

  if (!responses.length) {
    return (
      <div className="container">
        <div className="card text-center">
          <h2 className="title">No Responses Yet</h2>
          <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
            Share your form to start collecting feedback
          </p>
          <Link to="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const questions = responses[0].answers.map((a) => a.question);

  return (
    <div className="container">
      <div className="card">
        <div className="flex-between mb-6">
          <h2 className="title">Form Responses</h2>
          <div className="flex flex-gap">
            <Link to="/dashboard" className="btn btn-secondary btn-small">
              ← Dashboard
            </Link>
            <Link
              to={`/forms/${formId}/summary`}
              className="btn btn-secondary btn-small"
            >
              View Summary
            </Link>
            <a
              href={`/api/feedback/form/${formId}/export`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-small"
            >
              Export CSV
            </a>
          </div>
        </div>

        <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
          Total responses: <strong>{responses.length}</strong>
        </p>

        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Submitted At</th>
                {questions.map((q, i) => (
                  <th key={i}>{q}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responses.map((r) => (
                <tr key={r._id}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {new Date(r.createdAt).toLocaleDateString()}
                    <br />
                    <small style={{ color: "#6b7280" }}>
                      {new Date(r.createdAt).toLocaleTimeString()}
                    </small>
                  </td>
                  {r.answers.map((a, i) => (
                    <td
                      key={i}
                      style={{ maxWidth: "200px", wordWrap: "break-word" }}
                    >
                      {Array.isArray(a.answer) ? a.answer.join(", ") : a.answer}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResponseList;
