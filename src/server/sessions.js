import 'dotenv/config';
import PocketBase from 'pocketbase';

import { addToStream, client } from './config/redis-client';

const POCKETBASE = process.env['POCKETBASE'];
const SESSION_TIMEOUT = process.env['SESSION_TIMEOUT'];
const SESSION_PREFIX = process.env['SESSION_PREFIX'];
const SESSION_ALL_ACTIVE = process.env['SESSION_ALL_ACTIVE'];

const secure = process.env.NODE_ENV === 'production';

export const createSession = async (loggedInUser) => {
	const { record: user } = loggedInUser;
	const sessionId = `${SESSION_PREFIX}${user.id}`;

	await client.json.set(sessionId, '.', { user });
	await client.sAdd(SESSION_ALL_ACTIVE, sessionId);
	await addToStream('SESSION:CREATED', user.id, { ...user, sessionId }, true);
	if (SESSION_TIMEOUT) {
		await client.expire(sessionId, parseInt(SESSION_TIMEOUT));
	}

	return user.id;
};

export const deleteSession = async (userId) => {
	// const sessionData = await client.json.get(session);
	const sessionId = `${SESSION_PREFIX}${userId}`;
	await client.del(sessionId);
	await client.sRem(SESSION_ALL_ACTIVE, sessionId);
	await addToStream('SESSION:DELETED', userId, {}, true);
};

export const clearSession = async ({ locals }) => {
	const userId = locals.pb.authStore.model.id;
	await deleteSession(userId);
	locals.pb.authStore.clear();
};

export const checkSession = async (event, resolve) => {
	event.locals.pb = new PocketBase(POCKETBASE);

	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		const sessionId = `${SESSION_PREFIX}${event.locals.pb.authStore.model.id}`;
		const sessionData = await client.json.get(sessionId);
		if (sessionData) {
			event.locals.user = event.locals.pb.authStore.model;
			if (SESSION_TIMEOUT) {
				await client.expire(sessionId, parseInt(SESSION_TIMEOUT));
			}
		} else {
			// session has expired
			await clearSession(event);
			event.locals.user = null;
		}
	}

	const response = await resolve(event);

	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ httpOnly: false, secure })
	);

	return response;
};

export const getAllActiveSessions = async () => {
	const sessionList = await client.sMembers(SESSION_ALL_ACTIVE);

	if (!sessionList) {
		return [];
	}

	const sessions = await Promise.all(
		sessionList.map(async (session) => {
			const user = await client.json.get(session);
			// eslint-disable-next-line no-unused-vars
			const { token, ...rest } = user;
			return { session, ...rest };
		})
	);

	return sessions;
};
