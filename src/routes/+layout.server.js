import { serializePOJO } from '../lib/utils/helpers';

export const load = async ({ locals }) => {
	if (locals.user) {
		return { user: serializePOJO(locals.user) };
	}
	return { user: null };
};
