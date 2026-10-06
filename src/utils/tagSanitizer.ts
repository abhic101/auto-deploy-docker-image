import { MAX_VERSION_SEMANTIC,
    MAX_VERSION_SEMANTIC_VALUE,
    MAX_TAG_STRING_LENGTH
} from "@/constants/tag.constants.js";
import { BadRequest } from "@/errors/appError.js";
import updateLogger from '@/utils/updateLogger.js';

// Idea is to limit the size of the tag string to only contain version digits and dots
function sanitizeImageTag(tag: string) {
    try {
        if (tag.length > MAX_TAG_STRING_LENGTH) {
            
        }
        const spittedTags = tag.split('.');
    }
    
    
    
}