import { checkSession } from './server/config/session';

export const handle = async ({ event, resolve }) => {
	await checkSession(event);
	return await resolve(event);
};
