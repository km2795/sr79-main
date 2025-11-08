import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { router as swishRouter } from './routes/swish.ts';
import UserHandler from './UserHandler.ts';

// Configuration
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env["PORT"] || 2795;

// Initialize express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// Static file serving - Order matters!
// Serve compiled files from dist first
app.use('/swish', express.static(path.join(__dirname, 'dist')));
app.use('/swish', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (_req, res) => {
  res.end('Channel #SR79 Active');
});

// Mount Swish router
app.use('/swish', swishRouter);

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// 404 handler
app.use((_req, res) => {
  res.status(404).send('Not Found');
});

// Start server
async function startServer() {
  try {
    const userHandler = new UserHandler();
    await userHandler.checkDirectoryConfig({});
    
    app.listen(port, () => {
      console.log(`Channel SR79 Active; Port: ${port}`);
    });
  } catch (error) {
    console.error('Server Error during startup:', error);
    process.exit(1);
  }
}

startServer();
