import { invalid, redirect } from '@sveltejs/kit';
import { createSession } from '$server/sessions';
import { restClient } from '$server/config/rest-client';
import { base } from '$app/paths';

export const load = async ({ locals }) => {
	const { user } = locals;
	if (user) throw redirect(302, `${base}/dashboard`);

	return { name: 'Login Page' };
};

export const actions = {
	login: async ({ request }) => {
		const formData = await request.formData();
		const identifier = formData.get('identifier');
		const password = formData.get('password');
		try {
			if (!identifier || !password) {
				return invalid(400, {
					identifier,
					error: true,
					message: 'Username and Password are required'
				});
			}
			const user = await restClient.post('/auth/local', { identifier, password });

			await createSession(user);
		} catch (error) {
			console.log('Login failed', error.message);
			return invalid(400, {
				identifier,
				error: true,
				message: error.message
			});
		}
		throw redirect(302, `${base}/dashboard`);
	}
};
