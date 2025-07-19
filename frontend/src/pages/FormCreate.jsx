import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function FormCreate() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", questionType: "text", options: [""] },
  ]);
  const [error, setError] = useState("");
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
      setError("Title and all questions are required");
      return;
    }
    try {
      await api.post("/forms", { title, questions });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create form");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Create New Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Form Title</label>
          <input
            value={title}
            onChange={handleTitleChange}
            required
            style={{ width: "100%", marginBottom: 16 }}
          />
        </div>

        {questions.map((q, qi) => (
          <fieldset key={qi} style={{ marginBottom: 24 }}>
            <legend>
              Question {qi + 1}{" "}
              {questions.length > 1 && (
                <button type="button" onClick={() => removeQuestion(qi)}>
                  Remove
                </button>
              )}
            </legend>

            <div>
              <label>Text</label>
              <input
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(qi, "questionText", e.target.value)
                }
                required
                style={{ width: "100%", marginBottom: 8 }}
              />
            </div>

            <div>
              <label>Type</label>
              <select
                value={q.questionType}
                onChange={(e) =>
                  handleQuestionChange(qi, "questionType", e.target.value)
                }
              >
                <option value="text">Text</option>
                <option value="multiple-choice">Multiple Choice</option>
              </select>
            </div>

            {q.questionType === "multiple-choice" && (
              <div style={{ marginTop: 8 }}>
                <label>Options</label>
                {q.options.map((opt, oi) => (
                  <div key={oi} style={{ display: "flex", marginBottom: 4 }}>
                    <input
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(qi, oi, e.target.value)
                      }
                      required
                      style={{ flex: 1 }}
                    />
                    {q.options.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOption(qi, oi)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                {q.options.length < 5 && (
                  <button type="button" onClick={() => addOption(qi)}>
                    + Add Option
                  </button>
                )}
              </div>
            )}
          </fieldset>
        ))}

        {questions.length < 5 && (
          <button type="button" onClick={addQuestion}>
            + Add Question
          </button>
        )}

        <div style={{ marginTop: 16 }}>
          <button type="submit">Save Form</button>
        </div>
      </form>
    </div>
  );
}
