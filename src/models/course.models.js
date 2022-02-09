import { model, Schema } from "mongoose";

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    questions: {
        type: [{ type: Schema.Types.ObjectId, ref: "Question" }],
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    }
  
});

const Course = model("Course", courseSchema);

export default Course;
