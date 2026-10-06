import type { Request, Response, NextFunction } from 'express';
import {deployService} from '@/services/deploy.service.js';
import {loggerOrAndNotif} from '@/utils/errorLogger.js';

const deployLatestHander = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const status = await deployService(req.body.tag); // update the fields by looking at the github action webhook bodydata, or custom webhoook body data according to requirement
        loggerOrAndNotif('Success', req.body);
    } catch(err) {
        next(err);
    }
}

export {
    deployLatestHander
}