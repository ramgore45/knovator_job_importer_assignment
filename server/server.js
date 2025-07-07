import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongo } from './src/config/mongoose.js';
import importRoutes from './src/routes/importRoutes.js';

dotenv.config();
const app = express();
    
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

connectMongo();
app.use('/api/v1', importRoutes);
app.get('/test', (req, res) => {
    console.log('✅ /test route hit');
    res.send('Test working');
  });

import './src/workers/jobWorker.js';
import './src/crons/jobCron.js';

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
