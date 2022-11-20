import {
	POCKETBASE,
	SESSION_TIMEOUT,
	SESSION_PREFIX,
	SESSION_ALL_ACTIVE
} from '$env/static/private';
import PocketBase from 'pocketbase';

import { addToStream, client } from './config/redis-client';
// import { getTimeStamp } from '$lib/utils/date-utils';
const secure = process.env.NODE_ENV === 'production';

export const createSession = async (loggedInUser) => {
	const { record: user } = loggedInUser;
	const sessionId = `${SESSION_PREFIX}${user.id}`;

	await client.json.set(sessionId, '.', { user });
	await client.sAdd(SESSION_ALL_ACTIVE, sessionId);
	await addToStream('SESSION:CREATED', user.id, { ...user, sessionId });
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
	await addToStream('SESSION:DELETED', userId, {});
};

export const clearSession = async ({ locals }) => {
	await deleteSession(locals.user?.id);
	locals.pb.authStore.clear();
};

export const checkSession = async (event, resolve) => {
	event.locals.pb = new PocketBase(POCKETBASE);

	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = event.locals.pb.authStore.model;
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure }));

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
