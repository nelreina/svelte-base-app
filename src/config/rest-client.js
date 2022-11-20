import 'dotenv/config';
import RestClient from '@nelreina/rest-client';
import logger from './logger';

const API = process.env['API'];
logger.info(`API: ${API}`);
export const restClient = new RestClient(API);
