import 'dotenv/config';
import { createClient } from 'redis';
import { newEventStreamService as EventStream } from '@nelreina/redis-stream-consumer';
import { addToEventLog } from '@nelreina/redis-stream-consumer';
import logger from './logger';
import { handler } from '../stream-handler';
const STREAM = process.env['STREAM'] || 'session:audit';

const SERVICE_NAME = process.env['SERVICE_NAME'];
const REDIS_HOST = process.env['REDIS_HOST'];
const REDIS_PORT = process.env['REDIS_PORT'] || 6379;
const REDIS_USER = process.env['REDIS_USER'];
const REDIS_PW = process.env['REDIS_PW'];
logger.info(`Connecting to Redis at ${REDIS_HOST}:${REDIS_PORT}`);

let url;
if (REDIS_HOST) {
	url = 'redis://';
	if (REDIS_USER && REDIS_PW) {
		url += `${REDIS_USER}:${REDIS_PW}@`;
	}
	url += `${REDIS_HOST}:${REDIS_PORT}`;
}

export const client = createClient({ url, name: SERVICE_NAME });
(async () => {
	if (!client.isOpen) await client.connect();
	logger.info(`Connected to Redis at ${REDIS_HOST}:${REDIS_PORT}`);
	const msg = await EventStream(client, STREAM, 'BASE-APP', false, handler, '0', logger);
	logger.info(msg);
})();

export const addToStream = async (event, aggregateId, payload) => {
	if (!client.isOpen) await client.connect();

	const streamData = {
		streamKeyName: STREAM,
		aggregateId,
		payload,
		event,
		serviceName: 'BASE-APP'
	};
	// strapi.log.info(JSON.stringify(streamData));
	await addToEventLog(client, streamData);
};
