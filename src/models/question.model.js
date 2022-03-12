import { model, Schema } from "mongoose";

const questionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String, //[{ type: Schema.Types.ObjectId, ref: "Course" }],
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  difficult: {
    type: String,
    required: true,
  },
  questionText: {
    type: String,
    required: false,
  },
  solutionText: {
    type: String,
    required: false,
  },
  video: {
    type: String,
    required: false,
  },
  opciones: [
    {
      name: {
        type: String,
        required: false,
      },
      value: {
        type: String,
        required: false,
      },
      correct: {
        type: Boolean,
        required: false,
      },
    },
    {
      name: {
        type: String,
        required: false,
      },
      value: {
        type: String,
        required: false,
      },
      correct: {
        type: Boolean,
        required: false,
      },
    },
    {
      name: {
        type: String,
        required: false,
      },
      value: {
        type: String,
        required: false,
      },
      correct: {
        type: Boolean,
        required: false,
      },
    },
    {
      name: {
        type: String,
        required: false,
      },
      value: {
        type: String,
        required: false,
      },
      correct: {
        type: Boolean,
        required: false,
      },
    },
    {
      name: {
        type: String,
        required: false,
      },
      value: {
        type: String,
        required: false,
      },
      correct: {
        type: Boolean,
        required: false,
      },
    },
  ],
});

const Question = model("Question", questionSchema);

module.exports = {
  Question,
};
