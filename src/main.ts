import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { router as swishRouter } from './swish/routes/swish.ts';
import * as UserHandler from './swish/handlers/UserHandler.ts';
import * as ChatHandler from "./swish/handlers/ChatHandler.ts";

// Configuration
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env["PORT"] || 2795;

const app = express();

/**
 * Middleware setup.
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({windowMs: 15 * 60 * 1000, max: 1000}));

/**
 * Static Files router.
 */
app.use('/swish', express.static(path.join(__dirname, 'dist')));
// app.use('/swish', express.static(path.join(__dirname, 'public')));

/**
 * 'swish' service router.
 */
app.use('/swish', swishRouter);

/**
 * Root URL Handler.
 */
app.get('/', (_req, res) => {
  res.end('Channel #SR79 Active');
});

/**
 * Internal Server Error Handler.
 */
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

/**
 * 404 Handler.
 */
app.use((_req, res) => {
  res.status(404).send('Not Found');
});

// Start server
async function startServer() {
  try {
    await UserHandler.checkDirectoryConfig();
    await ChatHandler.checkChatIndexFile();

    app.listen(port, () => {
      console.log(`Channel SR79 Active; Port: ${port}`);
    });
  } catch (error) {
    console.error('Server Error during startup:', error);
    process.exit(1);
  }
}

startServer();
