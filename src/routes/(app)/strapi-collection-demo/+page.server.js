import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { serializePOJO } from '$lib/utils/helpers';
import { getMappings } from '$server/api';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect('303', base);
	}
	try {
		const data = await getMappings(locals.user.sessionId);
		const mappings = serializePOJO(data);

		return { mappings };
	} catch (error) {
		console.log(error.message);
		return { error: true, mappings: [] };
	}
};
