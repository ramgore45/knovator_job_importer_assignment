import { feedUrls } from '../utils/urls.js';
import { queueJobsFromFeed } from '../services/jobService.js';
import nodeCron from 'node-cron';


nodeCron.schedule('0 * * * *', async () => {
  console.log('jobCron loaded');
  console.log(`Cron job started at ${new Date().toLocaleString()}`);

  for (const feedUrl of feedUrls) {
    await queueJobsFromFeed(feedUrl);
  }

  console.log(`Cron job completed at ${new Date().toLocaleString()}`);
});
