import createRateLimiter from 'express-rate-limit';

// For deploy endpoint
const deployRateLimiter = createRateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 1,
    limit: 1,
    message: 'Too Many requests, please try again later',
    statusCode: 429,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: false,
    skipSuccessfulRequests: false
});

export {
    deployRateLimiter
}