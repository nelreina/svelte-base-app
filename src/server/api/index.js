import RestClient from '@nelreina/rest-client';
import { client } from '$server/config/redis-client';

const API = process.env['API'];
const olb = new RestClient(API);

export const getToken = async (sessionId) => {
	const session = await client.json.get(sessionId);
	return session.token;
};

export const getMappings = async (sessionId) => {
	try {
		const token = await getToken(sessionId);
		const resp = await olb.get('/vet-data-mappings?required=true', token);
		return resp;
	} catch (error) {
		console.log('LOG:  ~ file: index.js:20 ~ getMappings ~ error', error.message);
		return [];
	}
};
