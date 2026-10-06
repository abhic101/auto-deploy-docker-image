import { z } from 'zod';

const deployLatestSchema = z.object({
    tag: z.string()
        .min(6)
        .max(9)
}).strict();

export default deployLatestSchema;