import { model, Schema } from "mongoose";

const planSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
});

const Plan = model("Plan", planSchema);

module.exports = {
  Plan,
};
