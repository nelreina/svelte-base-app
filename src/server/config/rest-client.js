import 'dotenv/config';
import RestClient from '@nelreina/rest-client';
import { API, STRAPI_USERNAME, STRAPI_PASSWORD } from '$env/static/private';
import logger from './logger';

logger.info(`API: ${API}`);
export const restClient = new RestClient(API, { isStrapi: true });
(async () => {
	try {
		logger.info(`Logging in to Strapi... ${STRAPI_USERNAME}`);
		restClient.strapiLogin(STRAPI_USERNAME, STRAPI_PASSWORD);
	} catch (error) {
		logger.error(error.message);
	}
})();
