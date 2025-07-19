import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function FormSubmit() {
  const { id: formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const res = await api.get(`/forms/${formId}`);
        setForm(res.data.data);
        const init = {};
        res.data.data.questions.forEach((q) => {
          init[q.questionText] = q.questionType === "multiple-choice" ? "" : "";
        });
        setAnswers(init);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load form");
      } finally {
        setLoading(false);
      }
    };
    loadForm();
  }, [formId]);

  const handleChange = (question, value) => {
    setAnswers({ ...answers, [question]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        formId,
        answers: Object.entries(answers).map(([question, answer]) => ({
          question,
          answer,
        })),
      };
      await api.post("/feedback", payload);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading form...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container">
        <div className="card text-center">
          <h2 className="title" style={{ color: "#10b981" }}>
            Thank you!
          </h2>
          <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
            Your feedback has been submitted successfully.
          </p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="container">
        <div className="card">
          <p className="text-error">{error || "Form not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">{form.title}</h2>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          Please fill out all questions below
        </p>

        {error && <p className="text-error mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {form.questions.map((q, idx) => (
            <div key={idx} className="form-group">
              <label className="form-label">
                {q.questionText}
                {q.questionType === "text" && (
                  <span style={{ color: "#ef4444" }}>*</span>
                )}
              </label>

              {q.questionType === "text" ? (
                <input
                  className="form-input"
                  type="text"
                  value={answers[q.questionText] || ""}
                  onChange={(e) => handleChange(q.questionText, e.target.value)}
                  required
                  placeholder="Enter your answer"
                />
              ) : (
                <div style={{ marginTop: "0.5rem" }}>
                  {q.options.map((opt, oi) => (
                    <label
                      key={oi}
                      style={{
                        display: "block",
                        marginBottom: "0.75rem",
                        cursor: "pointer",
                        padding: "0.5rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        backgroundColor:
                          answers[q.questionText] === opt ? "#f3f4f6" : "white",
                      }}
                    >
                      <input
                        type="radio"
                        name={q.questionText}
                        value={opt}
                        checked={answers[q.questionText] === opt}
                        onChange={() => handleChange(q.questionText, opt)}
                        required
                        style={{ marginRight: "0.75rem" }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1rem" }}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
