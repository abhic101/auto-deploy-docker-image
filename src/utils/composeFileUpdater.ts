import { readFile, writeFile } from 'node:fs/promises';
import fs from 'fs';
import { parseDocument } from 'yaml';
import path from 'path';
import updateLogger from '@/utils/updateLogger.js';

const composeFileDir = path.resolve('compose');
const filePath = path.join(composeFileDir, 'docker-compose.yaml');

// Start parsing
async function updateTag(tag: string) {
    if (!fs.existsSync(filePath)) {
        updateLogger.error('File not found at: ' + filePath);
    }
    const composeFile = parseDocument(await readFile(filePath, 'utf8'));

    const currentImage = composeFile.get('image') as string;
    if (!currentImage) {
        updateLogger.error('Error parsing docker-compose.yaml: ', new Error('Unreadable Image Name'));
        return;
    }
    updateLogger.log('Current Image: ', currentImage);

    const currentImageArr = currentImage.split(':');
    const newImageArr = [currentImageArr[0], tag];
    const newImage = newImageArr.join(':');
    updateLogger.log('New Image: ', newImage);

    composeFile.set('image', newImage);

    await writeFile(filePath, composeFile.toString());
    updateLogger.log('Updated Compose File')
}

export default updateTag;
