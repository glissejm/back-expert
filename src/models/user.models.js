import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  payments: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    required:true,
  },
  course: {
    type: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    required: true,
  },
  progress: {
    type: [{ type: Schema.Types.ObjectId, ref: "Progress" }],
    required: true,
  },
  // premiun: {
  //   type: Boolean,
  //   required: true,
  // },
});


const User = model("User", userSchema);

module.exports={
  User
} ;
