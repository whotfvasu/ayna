import Feedback from "../models/feedbackModel.js";

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