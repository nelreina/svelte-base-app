import { invalid, redirect } from '@sveltejs/kit';
import { createSession } from '$server/sessions';
import { base } from '$app/paths';

export const load = async ({ locals }) => {
	const { user } = locals;
	if (user) throw redirect(302, `${base}/dashboard`);

	return { name: 'Login Page' };
	// tofo
};

// Path: src/routes/login/+page.server.js
export const actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const identifier = formData.get('identifier');
		const password = formData.get('password');
		const { pb } = locals;
		try {
			if (!identifier || !password) {
				return invalid(400, {
					identifier,
					error: true,
					message: 'Username and Password are required'
				});
			}

			const user = await pb.collection('users').authWithPassword(identifier, password);

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
