import 'dotenv/config';
import { createClient } from 'redis';

import { addToEventLog } from '@nelreina/redis-stream-consumer';
const STREAM = process.env['STREAM'] || 'tcb:declarations';

const SERVICE_NAME = process.env['SERVICE_NAME'];
const REDIS_HOST = process.env['REDIS_HOST'];
const REDIS_PORT = process.env['REDIS_PORT'] || 6379;
const REDIS_USER = process.env['REDIS_USER'];
const REDIS_PW = process.env['REDIS_PW'];
console.log('LOG:  ~ file: redis-client.js ~ line 9 ~ REDIS_HOST', REDIS_HOST);

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
})();

export const addToStream = async ({ event, aggregateId, payload }) => {
	if (!client.isOpen) await client.connect();

	const streamData = {
		streamKeyName: STREAM,
		aggregateId,
		payload,
		event,
		serviceName: 'API-DATA-TCB'
	};
	// strapi.log.info(JSON.stringify(streamData));
	await addToEventLog(client, streamData);
};
