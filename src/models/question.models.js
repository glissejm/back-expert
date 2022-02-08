import { model, Schema } from "mongoose";

const questionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  difficult: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  solution: {
    type: Object,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  option: {
    type: Object,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  }
});

const Question = model("Question", questionSchema);

export default Question;
