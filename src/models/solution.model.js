import { model, Schema } from "mongoose";

const solutionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: Object,
        required: true,
    },
    showed: {
        type: Boolean,
        required: true,
    },
  
});

const Solution = model("Solution", solutionSchema);

export default Solution;
