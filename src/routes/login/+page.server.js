import { invalid, redirect } from '@sveltejs/kit';
import { restClient } from '../../server/config/rest-client';
import { createSession } from '../../server/sessions';
import { base } from '$app/paths';

export const load = async ({ locals }) => {
	const { user } = locals;
	if (user) throw redirect(302, `${base}/dashboard`);

	return { name: 'Login Page' };
	// tofo
};

// Path: src/routes/login/+page.server.js
export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const identifier = formData.get('identifier');
		const password = formData.get('password');
		const userAgent = formData.get('userAgent');
		try {
			if (!identifier || !password) {
				return invalid(400, {
					identifier,
					error: true,
					message: 'Username and Password are required'
				});
			}

			const user = await restClient.post('/auth/local', { identifier, password });
			if (user.error) {
				return invalid(400, {
					identifier,
					error: true,
					message: 'Unable to login. Invalid user or password'
				});
			}

			await createSession(cookies, { ...user, userAgent });
		} catch (error) {
			return invalid(400, {
				identifier,
				error: true,
				message: 'Unable to login.'
			});
		}
		throw redirect(302, `${base}/dashboard`);
	}
};
