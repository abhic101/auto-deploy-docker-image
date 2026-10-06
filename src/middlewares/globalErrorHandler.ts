import type { Request, Response, NextFunction } from 'express';
import errRegistry from '@/errors/errorRegistry.js';
import '@/errors/errorHandlers.js';
import logger from '@/utils/errorLogger.js';


function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const handler = errRegistry.get(err.name);
    if (handler) {
        if (handler(err, res)) {
            if (process.env.ENV === 'dev') {
                console.warn('HTTP Error: ', err);
            } else {
                logger.warn('HTTP Error: ', err);
            }
            return;
        }
    }
    if (process.env.ENV === 'dev') {
        console.error('Unknown Error: ', err);
    } else {
        logger.error('Unknown Error: ', err);
    }
    res.status(500).json({
        message: 'Internal Server Error. Please try again later.'
    })
}

export default globalErrorHandler;