import { checkSession } from './server/sessions';

export const handle = async ({ event, resolve }) => {
	return await checkSession(event, resolve);
};
