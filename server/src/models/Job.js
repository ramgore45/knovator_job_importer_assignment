import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  company: { type: String, default: 'N/A' },
  location: { type: String, default: '' },
  url: { type: String },
  pubDate: { type: Date },
  description: { type: String },
  content: { type: String },
  image: { type: String },
  jobType: { type: String },
  guid: { type: String },
  feedSource: { type: String }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
