import mongoose, { connection } from "mongoose";
import options from "../config";

export const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true });
};

export const disconnect = async () => {
  
  await mongoose.disconnect();
} 
