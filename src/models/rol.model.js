import { model, Schema } from "mongoose";

const rolSchema = new Schema({
    role: {
        type: String,
        required: true,
    },
    db: {
        type: String,
    },
});

const Rol = model("Rol", rolSchema);

export default Rol;
