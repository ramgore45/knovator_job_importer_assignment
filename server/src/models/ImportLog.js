import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  fileName: String,
  importDateTime: { type: Date, default: Date.now },
  total: Number,
  new: Number,
  updated: Number,
  failed: Number,
  failures: [
    {
      job: String,
      reason: String
    }
  ]
});

export default mongoose.model('Import_Log', logSchema);
