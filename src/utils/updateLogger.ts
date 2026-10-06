import fs from 'fs';
import path from 'path';
import { Console } from 'console';

const logDir = path.resolve('logs');
fs.mkdirSync(logDir, {recursive: true});

const updateStream = fs.createWriteStream('./logs/updates.log', {flags: 'a'});
updateStream.on('error', (err) => process.stderr.write(`Update log stream failed: ${err.message}\n`));

const updateLogger = new Console({stdout: updateStream, stderr: updateStream});

const exportLogger = process.env.ENV === 'dev' ? console : updateLogger;

export default exportLogger;