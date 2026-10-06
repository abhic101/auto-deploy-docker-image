import path from 'path';
import dotenv from 'dotenv';
import { Server } from 'http';
dotenv.config({path: path.join(__dirname, '/config/.env')});

const {default: app} = await import('./app.js');

/**
 * Function to handle gracefull shutdown of application on relevant signals
 * @param signal Type of signal generated
 * @param server http server instance
 */
function shutdown(signal: string, server: Server) {
    console.log(`${signal} signal recieved!`);
    server.close(() => {
        console.log('Shutting down server...');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Forcing shutdown...');
        process.exit(1);
    }, 10000);
}

/**
 * Start the server and bind signal handlers
 */
function startServer() {
    const port = Number(process.env.PORT) | 3000;
    const server = app.listen(port, () => {
        console.log(`Webhook api server for Image updation and deployment is active on port ${port}`);
    })
    
    // Binding error signals and handler
    process.on('SIGINT', () => shutdown('SIGINT', server));
    process.on('SIGTERM', () => shutdown('SIGTERM', server));
    process.on('uncaughtException', (e) => {
        console.error('Uncaught Exception: ', e);
        shutdown('uncaughtException', server);
    });
    process.on('unhandledRejection', (e) => {
        console.error('Unhandled Rejection: ', e);
        shutdown('uncaughtException', server);
    })
}

startServer();