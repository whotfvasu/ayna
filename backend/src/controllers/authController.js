import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET,
  });

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = User.findOne({ email });
    if (exists)
      return res
        .status(400)
        .json({ success: false, error: "Email already in use" });
    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    res.status(201).json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email, token },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, error: "Invalid Cred." });
    }
    const token = signToken(user._id);
    return res.status(200).json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email, token },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
