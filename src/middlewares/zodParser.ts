import type {Request, Response, NextFunction} from 'express';
import {z, ZodError, ZodObject, type ZodAny} from 'zod';
import {Unprocessable} from '@/errors/appError.js';

const zodParser = (schema: ZodObject, field: 'body' | 'query' | 'params' = 'body') => (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = schema.parse(req[field]);
        req[field] = parsedData;
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            next(new Unprocessable('Invalid Request Format', {cause: err}))
        } else {
            next(err);
        }
    }
}

export default zodParser;