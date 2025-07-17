import Form from "../models/Form.js";

export const createForm = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const form = await Form.create({ title, questions });
    return res.status(201).json({ success: true, data: form });
  } catch (err) {
    console.error("Error creating form ", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: forms });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form)
      return res.status(404).json({ success: false, error: "Form not found" });
    return res.status(200).json({ success: true, data: form });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
