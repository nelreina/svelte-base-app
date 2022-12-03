import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { serializePOJO } from '$lib/utils/helpers';
import { pbAdmin } from '$server/config/pocketbase';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect('303', base);
	}
	const records = await pbAdmin.collection('products').getFullList();
	const products = serializePOJO(records);

	return { products: products };
};
