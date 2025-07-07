import { Queue } from 'bullmq';
import redis from '../config/redis.js';

export const jobQueue = new Queue('job-importer', { connection: redis });
