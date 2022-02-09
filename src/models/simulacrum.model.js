import { model, Schema } from "mongoose";

const simulacrumSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, 
    questions_id: {
        type: [String],
        required: true,
    }, 
});

const Simulacrum = model("Simulacrum", simulacrumSchema);

export default Simulacrum;
