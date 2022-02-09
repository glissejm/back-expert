import { model, Schema } from "mongoose";

const videoSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
});

const Video = model("Video", videoSchema);

export default Video;
