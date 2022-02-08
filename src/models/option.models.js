import { model, Schema } from "mongoose";

const optionSchema = new Schema({
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
  }
});

const Option = model("Option", optionSchema);

export default Option;
