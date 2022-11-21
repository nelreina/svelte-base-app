import logger from './config/logger';
// import { client } from './config/redis-client';

export const handler = async (stream) => {
	const { streamId, aggregateId, event } = stream;
	logger.info(`Stream: - Aggregate: ${aggregateId} - Event: ${event} }`);
	stream.ack(streamId);
};
