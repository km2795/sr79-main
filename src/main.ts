import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initSwish } from "./swish/index.ts"
import { router as swishRouter } from './swish/routes/swish.ts';


// Local app configurations.
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env["PORT"] || 2795;

const app = express();

/**
 * Global middlewares.
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({windowMs: 15 * 60 * 1000, max: 1000}));

/**
 * Static Files router.
 */
app.use('/swish', express.static(path.join(__dirname, 'dist')));

/**
 * Swish service handler.
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
    // Initialize the swish's initial service.
    await initSwish();

    app.listen(port, () => {
      console.log(`Channel SR79 Active; Port: ${port}`);
    });
  } catch (error) {
    console.error('Server Error during startup:', error);
    process.exit(1);
  }
}

startServer();
