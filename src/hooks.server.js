import { checkSession } from './server/sessions';

export const handle = async ({ event, resolve }) => {
	await checkSession(event);
	return await resolve(event);
};
