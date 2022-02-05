import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  premiun: {
    type: Boolean,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
