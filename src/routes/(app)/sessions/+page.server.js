import { redirect } from '@sveltejs/kit';
import { deleteSession, getAllActiveSessions } from '../../../config/session';
import { base } from '$app/paths';

export const load = async ({ locals }) => {
	if (!locals.user?.isAdmin) {
		throw redirect('303', base);
	}

	const sessions = await getAllActiveSessions();

	return { sessions };
};

export const actions = {
	delete: async ({ request }) => {
		const formDate = await request.formData();
		const session = formDate.get('session');
		await deleteSession(session);
	}
};
