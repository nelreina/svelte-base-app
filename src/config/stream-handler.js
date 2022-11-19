import logger from './logger';

export const handler = async (stream) => {
	const { streamId, aggregateId, event, payload } = stream;
	logger.info(
		`Stream: ${streamId} - Aggregate: ${aggregateId} - Event: ${event} - Payload: ${JSON.stringify(
			payload
		)}`
	);
};
