import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import deployRoute from './routes/deploy.route.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import { deployRateLimiter } from '@/config/rateLimiter.js';
import validateRequest from '@/middlewares/validateRequests.js';
const app = express();

// Essential middleware
app.use(helmet());
app.use(cors());
app.use(deployRateLimiter)
app.use(morgan('dev'));

// Verify requests
app.use(validateRequest);

app.use(express.json());

// Main route
app.use('/deploy', deployRoute);

// HealthCheck
app.get('/health', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            success: true,
            message: 'CD node service is healthy and running'
        });
    } catch(err) {
        next(err);
    }
});

app.use(globalErrorHandler);

export default app;