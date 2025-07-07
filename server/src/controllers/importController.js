import ImportLog from "../models/ImportLog.js";
import { queueJobsFromFeed } from "../services/jobService.js";

/**
 * Imports jobs from a given feed URL and queues them for processing.
 * @param {*} req
 * @param {*} res
 */
export const importJobs = async (req, res) => {
  try {
    const { feedUrl } = req.body;
    console.log(`Importing jobs from feed...`, feedUrl);
    if (!feedUrl) return res.status(400).json({ error: 'feedUrl is required' });

    const result = await queueJobsFromFeed(feedUrl);

    if (!result.success) {
      return res.status(404).json({ message: 'No jobs found in this feed.' });
    }

    res.json({ message: 'Jobs successfully queued', total: jobs.length, jobs });

  } catch (err) {
    console.error(`Error in importJobs controller:`, err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Fetches and returns the list of import logs, sorted by latest first.
 * @param {*} req 
 * @param {*} res 
 */
export const getImportLogs = async (req, res) => {
  try {
    console.log(`Fetching import logs...`);
    const logs = await ImportLog.find().sort({ importDateTime: -1 });

    res.json(logs);
  } catch (err) {
    console.error(`Error fetching import logs:`, err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};