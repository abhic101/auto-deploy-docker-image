import type {Request, Response, NextFunction} from 'express';
import crypto from 'crypto';
import errorLogger from '@/utils/errorLogger.js';

function validateRequest(req: Request, res: Response, next: NextFunction) {
    try {
        const ts = req.get('X-Ghub-Timestamp');
        const recieved = req.get('X-Ghub-Signature') || "";

        if (!Buffer.isBuffer(req.body) || !ts) {
            errorLogger.warn('Invalid Request: Body or timestamp not present');
            return next('route');
        }
        
        const expected = crypto.createHmac('sha256', process.env.SECRET)
            .update(`${ts}.${req.body.toString('hex')}`)
            .digest('hex');

        const a = Buffer.from(recieved);
        const b = Buffer.from(expected);
        if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
            errorLogger.warn('Invalid Request: Bad Signature');
            return next('route');
        }
        const age = Math.abs(Date.now() / 1000 - Number(ts));
        if (age < 300) {
            errorLogger.warn('Invalid Request: Bad Signature');
            return next('route');
        }
    } catch(err) {
        next(err);
    }
}

export default validateRequest;