import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function FormSubmit() {
  const { id: formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
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
    try {
      // build payload
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
    }
  };

  if (success)
    return (
      <div style={{ maxWidth: 600, margin: "auto" }}>
        <h2>Thank you!</h2>
        <p>Your feedback has been submitted.</p>
      </div>
    );

  if (!form)
    return (
      <div style={{ maxWidth: 600, margin: "auto" }}>
        {error ? <p style={{ color: "red" }}>{error}</p> : <p>Loading…</p>}
      </div>
    );

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>{form.title}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {form.questions.map((q, idx) => (
          <div key={idx} style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 4 }}>
              {q.questionText}
            </label>
            {q.questionType === "text" ? (
              <input
                type="text"
                value={answers[q.questionText]}
                onChange={(e) => handleChange(q.questionText, e.target.value)}
                required
                style={{ width: "100%" }}
              />
            ) : (
              q.options.map((opt, oi) => (
                <div key={oi}>
                  <label>
                    <input
                      type="radio"
                      name={q.questionText}
                      value={opt}
                      checked={answers[q.questionText] === opt}
                      onChange={() => handleChange(q.questionText, opt)}
                      required
                    />
                    {" " + opt}
                  </label>
                </div>
              ))
            )}
          </div>
        ))}
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}
