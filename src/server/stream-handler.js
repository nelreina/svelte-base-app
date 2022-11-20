import logger from './config/logger';
import { pb } from './config/pocketbase.js';
import { client } from './config/redis-client';

export const handler = async (stream) => {
	const { streamId, aggregateId, event, payload } = stream;
	logger.info(`Stream: - Aggregate: ${aggregateId} - Event: ${event} }`);
	if (event === 'SESSION:CREATED') {
		try {
			const { username, email, role, sessionId } = payload;

			const pbSession = await pb
				.collection('sessions')
				.create({ username, email, role, sessionId });
			client.json.set(sessionId, '.pbSession', pbSession);

			stream.ack(streamId);
		} catch (error) {
			logger.error(error);
		}
	}
	if (event === 'SESSION:DELETED') {
		try {
			const { pbSession } = payload;
			await pb.collection('sessions').delete(pbSession.id);
			stream.ack(streamId);
		} catch (error) {
			logger.error(error);
		}
	}
};
