import 'dotenv/config';

import PocketBase from 'pocketbase';
import EventSource from 'eventsource';
import logger from './logger.js';

const POCKETBASE = process.env['POCKETBASE'];
const POCKETBASE_ADMIN = process.env['POCKETBASE_ADMIN'];
const POCKETBASE_PASSWORD = process.env['POCKETBASE_PASSWORD'];

global.EventSource = EventSource;
export const pbAdmin = new PocketBase(POCKETBASE);
(async () => {
	try {
		const authData = await pbAdmin.admins.authWithPassword(POCKETBASE_ADMIN, POCKETBASE_PASSWORD);
		logger.info('✅ PocketBase admin authenticated: ' + JSON.stringify(authData));
	} catch (error) {
		logger.error('❗️ PocketBase admin authentication failed', error.message);
	}
})();
