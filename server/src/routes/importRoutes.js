import express from 'express';
import { getImportLogs, importJobs } from '../controllers/importController.js';
import ImportLog from '../models/ImportLog.js';
const router = express.Router();

router.post('/import', importJobs);

router.get('/importLogs', getImportLogs);

export default router;
