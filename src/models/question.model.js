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
  difficult: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: false,
  },
  solution: {
    type: [{ type: Schema.Types.ObjectId, ref: "Solution" }],
    required: false,
  },
  video: {
    type: String,
    required: false,
  },
  option: {
    type: [{ type: Schema.Types.ObjectId, ref: "Option" }],
    required: false,
  },
  status: {
    type: Boolean,
    required: false,
  },
});

const Question = model("Question", questionSchema);

module.exports = {
  Question,
};
