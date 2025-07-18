import Feedback from "../models/Feedback.js";
import { Parser as Json2csvParser } from "json2csv";

export const submitFeedback = async (req, res) => {
  try {
    const { formId, answers } = req.body;
    const feedback = await Feedback.create({ formId, answers });
    return res.status(201).json({ success: true, data: feedback });
  } catch (err) {
    console.error("Error submiting feedback ", err.message);
    return res.status(500).jsonn({ success: false, error: err.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: feedbacks });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getFeedbackByForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const feedbacks = await Feedback.find({ formId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: feedbacks });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// • Fetch all feedback docs for the given formId.
// • Initialize an empty summary object and count totalResponses.
// • Loop over each feedback’s answers array:
// – For each { question, answer }, ensure summary[question] is an object.
// – Normalize answer to a string (join arrays if multi-select).
// – Increment summary[question][answer] by 1.
// • Return JSON with
// – totalResponses: number of feedback entries
// – summary: a map from question → { answerOption → count }

export const getFeedbackSummary = async (req, res) => {
  try {
    const { formId } = req.params;
    const feedbacks = await Feedback.find({ formId });
    const summary = {};
    feedbacks.forEach((fb) => {
      fb.answers.forEach(({ question, answer }) => {
        if (!summary[question]) summary[question] = {};
        const key = Array.isArray(answer) ? answer.join(", ") : answer;
        summary[question][key] = (summary[question][key] || 0) + 1;
      });
    });
    return res.status(200).json({
      success: true,
      data: {
        totalResponses: feedbacks.length,
        summary,
      },
    });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// • Fetch all feedback docs for the given formId and call .lean() for plain JS objects.
// • Map each feedback to a “row” object with:
// – _id and createdAt fields
// – One key per question, value = the answer (joined string if array)
// • Use json2csv’s Parser to convert the array of row objects into a CSV string.
// • Set response headers for CSV download (Content-Type: text/csv, Content-Disposition: attachment)
// • Send the CSV string so the client downloads a .csv file.

export const exportFeedbackCSV = async (req, res) => {
  try {
    const { formId } = req.params;
    const feedbacks = await Feedback.find({ formId }).lean();
    const rows = feedbacks.map((fb) => {
      const row = { _id: fb._id.toString(), createdAt: fb.createdAt };
      fb.answers.forEach(({ question, answer }) => {
        row[question] = Array.isArray(answer) ? answer.join(", ") : answer;
      });
      return row;
    });
    const parser = new Json2csvParser();
    const csv = parser.parse(rows);
    res.header("Content-Type", "text/csv");
    res.attachment(`feedback_form_${formId}.csv`);
    res.send(csv);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
