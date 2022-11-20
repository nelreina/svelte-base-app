import PocketBase from 'pocketbase';
import EventSource from 'eventsource';
import { POCKETBASE, POCKETBASE_ADMIN, POCKETBASE_PASSWORD } from '$env/static/private';
import logger from './logger.js';

global.EventSource = EventSource;
export const pbAdmin = new PocketBase(POCKETBASE);
(async () => {
	try {
		const authData = await pbAdmin.admins.authWithPassword(POCKETBASE_ADMIN, POCKETBASE_PASSWORD);
		logger.info('PocketBase admin authenticated: ' + JSON.stringify(authData));
	} catch (error) {
		logger.error('PocketBase admin authentication failed', error.message);
	}
})();
