import mongoose from "mongoose";

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  date: Date,
  size: String,
  purchased: String,
  win: String,
  prize: String,
  appPrize: String,
  comment: String
});

export default mongoose.model("entry", entrySchema);
