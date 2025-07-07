import { Worker } from 'bullmq';
import redis from '../config/redis.js';
import Job from '../models/Job.js';
import ImportLog from '../models/ImportLog.js';

export const jobWorker = new Worker('job-importer', async (job) => {
  const { jobs, fileName } = job.data;

  let totalFetched = jobs.length;
  let newJobs = 0, updatedJobs = 0, failedJobs = 0, failures = [];

  for (const j of jobs) {
    try {
      const jobData = {
        jobId: j.guid?._ || j.link,
        title: j.title,
        company: j["job_listing:company"] || 'N/A',
        location: j["job_listing:location"] || '',
        url: j.link,
        pubDate: new Date(j.pubDate),
        description: j.description || '',
        content: j["content:encoded"] || '',
        image: j["media:content"]?.$?.url || '',
        jobType: j["job_listing:job_type"] || '',
        guid: j.guid?._ || '',
        feedSource: fileName
      };

      const existingJob = await Job.findOne({ jobId: jobData.jobId });

      if (existingJob) {
        await Job.updateOne({ jobId: jobData.jobId }, jobData);
        updatedJobs++;
      } else {
        await Job.create(jobData);
        newJobs++;
      }

    } catch (err) {
      failedJobs++;
      failures.push({ job: j.guid?._ || j.link, reason: err.message });
    }
  }

  await ImportLog.create({
    fileName,
    total: totalFetched,
    new: newJobs,
    updated: updatedJobs,
    failed: failedJobs,
    failures
  });

}, { connection: redis });
