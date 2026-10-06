import {Router} from 'express';
import { deployLatestHander } from '@/controllers/deploy.controller.js';
import deployLatestSchema from '@/schemas/deploy.schema.js';
import zodParser from '@/middlewares/zodParser.js';

const route = Router();


route.post('/latest', zodParser(deployLatestSchema), deployLatestHander);

export default route;