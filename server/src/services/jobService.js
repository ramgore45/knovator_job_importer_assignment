import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { jobQueue } from '../queues/jobQueue.js';

/**
 * Fetches job listings from a given RSS/XML feed URL and parses them to JSON.
 * @param {string} url
 * @returns {Promise<Array>} Parsed job items or empty array
 */
export const fetchJobsFromFeed = async (url) => {
  try {
    console.log(`Fetching jobs from: ${url}`);
    const { data } = await axios.get(url);
    const json = await parseStringPromise(data, { explicitArray: false });

    const items = json?.rss?.channel?.item;
    if (!items) {
      console.warn(`No job items found in feed: ${url}`);
      return [];
    }

    const jobs = Array.isArray(items) ? items : [items];
    console.log(`✅ Fetched ${jobs.length} jobs from: ${url}`);
    return jobs;

  } catch (err) {
    console.error(`❌ Error fetching jobs from ${url}:`, err.message);
    return [];
  }
};


/**
 * Fetches jobs from feedUrl, adds them to BullMQ queue
 * @param {string} feedUrl
 */
export const queueJobsFromFeed = async (feedUrl) => {
  let fileName = 'imported-jobs';
  const urlObj = new URL(feedUrl);
  const category = urlObj.searchParams.get('job_categories');
  fileName = category ? category : 'imported-jobs';

  const jobs = await fetchJobsFromFeed(feedUrl);
  if (jobs.length === 0) {
    console.log(`⚠️ No jobs found in ${feedUrl}`);
    return { success: false, total: 0 };
  }

  await jobQueue.add('importJob', { jobs, fileName });
  console.log(`✅ Queued ${jobs.length} jobs from ${fileName}`);

  return { success: true, total: jobs.length };
};

