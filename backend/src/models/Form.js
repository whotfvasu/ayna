import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  questionType: {
    type: String,
    enum: ["text", "multiple-choice"],
    required: true,
  },
  options: { type: [String], default: [] },
});

const FormSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    questions: { type: [QuestionSchema], required: true },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", FormSchema);
export default Form;
