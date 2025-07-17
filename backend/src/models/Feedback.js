import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },

    answers: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
