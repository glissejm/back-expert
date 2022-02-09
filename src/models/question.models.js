import { model, Schema } from "mongoose";

const questionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: [{ type: Schema.Types.ObjectId, ref: "Course" }],
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
    type: [{ type: Schema.Types.ObjectId, ref: "Solution" }],
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  option: {
    type: [{ type: Schema.Types.ObjectId, ref: "Option" }],
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  }
});

const Question = model("Question", questionSchema);

export default Question;
