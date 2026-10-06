class AppError extends Error {
    statusCode = 500;
    name: string;
    canSend = false;
    
    constructor (message: string, options: ErrorOptions = {}) {
        super(message, options);
        this.name = this.constructor.name;

        // Bind stacktrace
        Error.captureStackTrace(this, this.constructor);
    }
}

class BadRequest extends AppError {
    statusCode = 400;
    canSend = true;
    constructor(message: string, options: ErrorOptions = {}) {
        super(message, options);
    }
}

class Unauthorized extends AppError {
    statusCode = 401;
    canSend = true;
    constructor(message: string, options: ErrorOptions = {}) {
        super(message, options);
    }
}

class Forbidden extends AppError {
    statusCode = 403;
    canSend = true;
    constructor(message: string, options: ErrorOptions = {}) {
        super(message, options);
    }
}

class NotFound extends AppError {
    statusCode = 404;
    canSend = true;
    constructor(message: string, options: ErrorOptions = {}) {
        super(message, options);
    }
}

class Conflict extends AppError {
    statusCode = 409;
    canSend = true;
    constructor(message: string, options: ErrorOptions = {}) {
        super(message, options);
    }
}

class Unprocessable extends AppError {
    statusCode = 422;
    canSend = true;
    constructor(message: string, options:ErrorOptions = {}) {
        super(message, options);
    }
}

export {
    AppError,
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    Conflict,
    Unprocessable
}