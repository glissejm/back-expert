import { model, Schema } from "mongoose";

const questionSchema = new Schema({
  name: {
    type: String,
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
  //many items are missing
});

const Question = model("Question", questionSchema);

export default Question;
