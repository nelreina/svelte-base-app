import 'dotenv/config';
import RestClient from '@nelreina/rest-client';
import logger from './logger';

const API = process.env['API'];
const STRAPI_USERNAME = process.env['STRAPI_USERNAME'];
const STRAPI_PASSWORD = process.env['STRAPI_PASSWORD'];

logger.info(`API: ${API}`);
export const restClient = new RestClient(API, { isStrapi: true });
(async () => {
	try {
		logger.info(`Logging in to Strapi... ${STRAPI_USERNAME}`);
		const resp = await restClient.strapiLogin(STRAPI_USERNAME, STRAPI_PASSWORD);
		if (resp) {
			logger.info(`✅ Success Logged in to Strapi Declaration! ${STRAPI_USERNAME}`);
		} else {
			logger.error(`❌ Error Logged in to Strapi Declaration! ${STRAPI_USERNAME}`);
		}
	} catch (error) {
		logger.error(error.message);
	}
})();
