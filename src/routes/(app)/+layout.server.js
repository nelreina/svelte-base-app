import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { serializePOJO } from '../../lib/utils/helpers';

export const load = async ({ locals }) => {
	const { user } = locals;
	if (!user) throw redirect(302, `${base}/login`);

	return serializePOJO(user);
};
