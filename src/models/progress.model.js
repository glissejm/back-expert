import { model, Schema } from "mongoose";

const progressSchema = new Schema({
    question: {
        type: [{ type: Schema.Types.ObjectId, ref: "Question" }],
        required:true,
    },
    simulacrum: {
        type: [{ type: Schema.Types.ObjectId, ref: "Simulacrum" }],
        required: true,
    },
});

const Progress = model("Progress", progressSchema);

export default Progress;
