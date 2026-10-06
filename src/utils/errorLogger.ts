import fs from 'fs';
import path from 'path';
import { Console } from 'console';

const logDir = path.resolve('logs');
fs.mkdirSync(logDir, {recursive: true});

const errStream = fs.createWriteStream("./logs/appErrors.log", {flags: "a"});
errStream.on('error', (err) => process.stderr.write(`log stream failed: ${err.message}\n`));

const errorLogger = new Console({stdout: process.stdout, stderr: errStream});

const exportLogger = process.env.ENV === 'dev' ? console : errorLogger;

export default exportLogger;