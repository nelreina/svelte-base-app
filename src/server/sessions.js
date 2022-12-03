import 'dotenv/config';
import { getTimeStamp } from '$lib/utils/date-utils';
import { addToStream, client } from './config/redis-client';

const SESSION_TIMEOUT = process.env['SESSION_TIMEOUT'];
const SESSION_PREFIX = process.env['SESSION_PREFIX'];
const SESSION_ALL_ACTIVE = process.env['SESSION_ALL_ACTIVE'];
const SESSION_COOKIE_NAME = process.env['SESSION_COOKIE_NAME'];

const secure = process.env.NODE_ENV === 'production';

export const createSession = async (cookies, session) => {
	const token = crypto.randomUUID();

	const sessionId = `${SESSION_PREFIX}${token}`;
	const { jwt, user } = session;
	const { role, username, email } = user;
	const { type } = role;

	const isAdmin = type === 'admin';

	const sessionData = {
		token: jwt,
		role: type,
		username,
		email,
		isAdmin,
		loggedInAt: getTimeStamp(),
		sessionId
	};

	await client.json.set(sessionId, '.', sessionData);
	await client.sAdd(SESSION_ALL_ACTIVE, sessionId);
	await addToStream('SESSION:CREATED', username, { ...sessionData, sessionId });
	cookies.set(SESSION_COOKIE_NAME, sessionId),
		{ httpOnly: true, path: '/', sameSite: 'strict', secure };
	if (SESSION_TIMEOUT) {
		await client.expire(sessionId, parseInt(SESSION_TIMEOUT));
	}

	return token;
};

export const deleteSession = async (sessionId) => {
	const sessionData = await client.json.get(sessionId);
	await client.del(sessionId);
	await client.sRem(SESSION_ALL_ACTIVE, sessionId);
	await addToStream('SESSION:DELETED', sessionData?.username || sessionId, {});
};

export const clearSession = async ({ locals, cookies }) => {
	const sessionId = cookies?.get(SESSION_COOKIE_NAME);
	locals.user = null;
	await deleteSession(sessionId);
};

export const checkSession = async (event, resolve) => {
	const sessionId = event.cookies?.get(SESSION_COOKIE_NAME);

	if (!sessionId) {
		return await resolve(event);
	}

	const user = await client.json.get(sessionId);
	if (!user) {
		await clearSession(event);
	} else {
		// eslint-disable-next-line no-unused-vars
		const { token, ...rest } = user;
		event.locals.user = rest;
		if (SESSION_TIMEOUT) {
			await client.expire(sessionId, parseInt(SESSION_TIMEOUT));
		}
	}
	return await resolve(event);
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
