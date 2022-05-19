import mongoose, { connection } from "mongoose";
import options from "../config/index.js";

export const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true });
};

export const disconnect = async () => {
  
  await mongoose.disconnect();
} 
