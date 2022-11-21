import logger from './config/logger';
import { pbAdmin } from './config/pocketbase.js';
// import { client } from './config/redis-client';

export const handler = async (stream) => {
	const { streamId, aggregateId, event } = stream;
	logger.info(`Stream: - Aggregate: ${aggregateId} - Event: ${event} }`);
	if (event === 'SESSION:CREATED') {
		try {
			pbAdmin.collection('users').update(aggregateId, { isOnline: true });
			stream.ack(streamId);
		} catch (error) {
			logger.error(error);
		}
	}
	if (event === 'SESSION:DELETED') {
		try {
			pbAdmin.collection('users').update(aggregateId, { isOnline: false });
			stream.ack(streamId);
		} catch (error) {
			logger.error(error);
		}
	}
};
