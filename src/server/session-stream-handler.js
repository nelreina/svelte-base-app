import logger from './config/logger';

export const handler = async (stream) => {
	const { streamId, aggregateId, event } = stream;
	logger.info(`Stream: - Aggregate: ${aggregateId} - Event: ${event} }`);
	stream.ack(streamId);
};
