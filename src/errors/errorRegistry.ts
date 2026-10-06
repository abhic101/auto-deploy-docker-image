import type {Response} from 'express';
import type { AppError } from '@/errors/appError.js';

const errorRegistry = new Map<string, (err: AppError, res: Response) => boolean>();

export default errorRegistry;