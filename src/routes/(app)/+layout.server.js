import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export const load = async ({ locals }) => {
	const { user } = locals;
	if (!user) throw redirect(302, `${base}/login`);

	return user;
};
