import 'dotenv/config';
import { client } from './redis-client';
import { getTimeStamp } from '$lib/utils/date-utils';
import { base } from '$app/paths';

const SESSION_TIMEOUT = process.env['SESSION_TIMEOUT'];
const SESSION_PREFIX = process.env['SESSION_PREFIX'];
const SESSION_COOKIE_NAME = process.env['SESSION_COOKIE_NAME'];
const SESSION_ALL_ACTIVE = process.env['SESSION_ALL_ACTIVE'];

const secure = process.env.NODE_ENV === 'production';

export const createSession = async (cookies, loggedInUser) => {
	const token = crypto.randomUUID();

	const sessionToken = `${SESSION_PREFIX}${token}`;
	const { jwt, user, userAgent } = loggedInUser;
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
		userAgent
	};

	await client.json.set(sessionToken, '.', sessionData);
	await client.sAdd(SESSION_ALL_ACTIVE, sessionToken);
	cookies.set(SESSION_COOKIE_NAME, sessionToken),
		{ httpOnly: true, path: '/', sameSite: 'strict', secure };
	if (SESSION_TIMEOUT) {
		await client.expire(sessionToken, parseInt(SESSION_TIMEOUT));
	}

	return token;
};

export const deleteSession = async (session) => {
	await client.del(session);
	await client.sRem(SESSION_ALL_ACTIVE, session);
};

export const clearSession = async ({ cookies }) => {
	const session = cookies.get(SESSION_COOKIE_NAME);
	await deleteSession(session);
	cookies.set(SESSION_COOKIE_NAME, '', { path: base, expires: new Date(0) });
};

export const checkSession = async (event) => {
	const session = event.cookies?.get(SESSION_COOKIE_NAME);

	if (!session) {
		return false;
	}

	const user = await client.json.get(session);
	if (!user) {
		await clearSession(event);
	} else {
		// eslint-disable-next-line no-unused-vars
		const { token, ...rest } = user;
		event.locals.user = rest;
		if (SESSION_TIMEOUT) {
			await client.expire(session, parseInt(SESSION_TIMEOUT));
		}
	}
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
