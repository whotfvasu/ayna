import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function FormCreate() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", questionType: "text", options: [""] },
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleQuestionChange = (idx, field, value) => {
    const qs = [...questions];
    qs[idx][field] = value;
    if (field === "questionType" && value === "text") qs[idx].options = [""];
    setQuestions(qs);
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const qs = [...questions];
    qs[qIdx].options[oIdx] = value;
    setQuestions(qs);
  };

  const addQuestion = () => {
    if (questions.length >= 5) return;
    setQuestions([
      ...questions,
      { questionText: "", questionType: "text", options: [""] },
    ]);
  };

  const removeQuestion = (idx) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const addOption = (qIdx) => {
    const qs = [...questions];
    qs[qIdx].options.push("");
    setQuestions(qs);
  };

  const removeOption = (qIdx, oIdx) => {
    const qs = [...questions];
    qs[qIdx].options = qs[qIdx].options.filter((_, i) => i !== oIdx);
    setQuestions(qs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || questions.some((q) => !q.questionText)) {
      setError("Form title and all questions are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/forms", { title, questions });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="flex-between mb-6">
          <h2 className="title">Create New Form</h2>
          <Link to="/dashboard" className="btn btn-secondary btn-small">
            ← Back to Dashboard
          </Link>
        </div>

        {error && <p className="text-error mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Form Title</label>
            <input
              className="form-input"
              value={title}
              onChange={handleTitleChange}
              required
              placeholder="e.g. Customer Satisfaction Survey"
            />
          </div>

          {questions.map((q, qi) => (
            <div key={qi} className="fieldset">
              <div className="flex-between mb-4">
                <span className="legend">Question {qi + 1}</span>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qi)}
                    className="btn btn-danger btn-small"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Question Text</label>
                <input
                  className="form-input"
                  value={q.questionText}
                  onChange={(e) =>
                    handleQuestionChange(qi, "questionText", e.target.value)
                  }
                  required
                  placeholder="Enter your question"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Question Type</label>
                <select
                  className="form-select"
                  value={q.questionType}
                  onChange={(e) =>
                    handleQuestionChange(qi, "questionType", e.target.value)
                  }
                >
                  <option value="text">Text Input</option>
                  <option value="multiple-choice">Multiple Choice</option>
                </select>
              </div>

              {q.questionType === "multiple-choice" && (
                <div className="form-group">
                  <label className="form-label">Answer Options</label>
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex flex-gap mb-4">
                      <input
                        className="form-input"
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(qi, oi, e.target.value)
                        }
                        required
                        placeholder={`Option ${oi + 1}`}
                      />
                      {q.options.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOption(qi, oi)}
                          className="btn btn-secondary btn-small"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  {q.options.length < 5 && (
                    <button
                      type="button"
                      onClick={() => addOption(qi)}
                      className="btn btn-secondary btn-small"
                    >
                      + Add Option
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="flex-between">
            {questions.length < 5 && (
              <button
                type="button"
                onClick={addQuestion}
                className="btn btn-secondary"
              >
                + Add Question
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating Form..." : "Create Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
