import { redirect } from '@sveltejs/kit';
import { clearSession } from '$server/sessions';
import { base } from '$app/paths';

export const load = async () => {
	throw redirect(302, base);
};

export const actions = {
	default: clearSession
};
