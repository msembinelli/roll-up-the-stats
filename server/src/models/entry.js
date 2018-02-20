import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  id: { type: Number, unique: true },
  firstname: String,
  lastname: String,
  email: String,
  date: Date,
  size: String,
  win: String,
  prize: String,
  comment: String
});

export default mongoose.model('entry', entrySchema);