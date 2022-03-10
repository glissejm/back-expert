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
  option1: {
    type: String,
    required: false,
  },
  option2: {
    type: String,
    required: false,
  },
  option3: {
    type: String,
    required: false,
  },
  option4: {
    type: String,
    required: false,
  },
  option5: {
    type: String,
    required: false,
  },
});

const Question = model("Question", questionSchema);

module.exports = {
  Question,
};
