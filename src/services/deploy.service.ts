import updateTag from '@/utils/composeFileUpdater.js';
import sanitizeImageTag from '@/utils/tagSanitizer.js';
import updateLogger from '@/utils/updateLogger.js';

async function deployService(newTag: string) {
    updateLogger.log('New deployment request recieved for tag: ' + newTag);
    const validatedNewTag = sanitizeImageTag(newTag);
    
}

export {
    deployService
}