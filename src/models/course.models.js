import { model, Schema } from "mongoose";

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    }    
  
});

const Course = model("Course", courseSchema);

export default Course;
