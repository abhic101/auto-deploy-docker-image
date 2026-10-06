import type { Response } from 'express';
import {
    AppError,
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    Conflict,
    Unprocessable
} from '@/errors/appError.js';
import errorRegistry from './errorRegistry.js'

function handleHttpError(err: AppError, res: Response) {
    if (!err.canSend) return false;
    res.status(err.statusCode).json({
        message: err.message
    });
    return true;
}


errorRegistry.set(AppError.name, handleHttpError);
errorRegistry.set(BadRequest.name, handleHttpError);
errorRegistry.set(Unauthorized.name, handleHttpError);
errorRegistry.set(Forbidden.name, handleHttpError);
errorRegistry.set(NotFound.name, handleHttpError);
errorRegistry.set(Conflict.name, handleHttpError);
errorRegistry.set(Unprocessable.name, handleHttpError);