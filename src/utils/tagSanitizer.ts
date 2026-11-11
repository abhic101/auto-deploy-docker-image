import { MAX_VERSION_SEMANTIC,
    MAX_VERSION_SEMANTIC_VALUE,
    MAX_TAG_STRING_LENGTH
} from "@/constants/tag.constants.js";
import { BadRequest } from "@/errors/appError.js";
import updateLogger from '@/utils/updateLogger.js';

// Idea is to limit the size of the tag string to only contain version digits and dots
function sanitizeImageTag(tag: string) {

    // Full length check
    if (tag.length > MAX_TAG_STRING_LENGTH) {
        updateLogger.error(`${tag.length} is invalid tag length. Tag: ${tag}`);
        throw new BadRequest('Invalid Tag');
    }

    const splittedTags = tag.split('.');
    // Number of version semantic check
    if (splittedTags.length > MAX_VERSION_SEMANTIC) {
        updateLogger.error(`${splittedTags.length} is invalid number of versem. Tag: ${tag}`);
        throw new BadRequest('Invalid Tag');
    }

    // Check if each digit is a number in each version type and is smaller than allowed version value
    const symbolChecker = /^\d+$/;
    for (let ver of splittedTags) {
        const isNumber = symbolChecker.test(ver);
        if (!isNumber) {
            updateLogger.error(`${ver} is invalid version value. Tag: ${tag}`);
            throw new BadRequest('Invalid Tag');
        }
        if (Number(ver) > MAX_VERSION_SEMANTIC_VALUE) {
            updateLogger.error(`${ver} is invalid version value. Tag: ${tag}`);
            throw new BadRequest('Invalid Tag');
        }
    }

    // All checks verified
    return splittedTags.join('.');
}

export default sanitizeImageTag;