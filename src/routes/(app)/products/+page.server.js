import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { serializePOJO } from '$lib/utils/helpers';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect('303', base);
	}
	const records = await locals.pb.collection('products').getFullList();
	const products = serializePOJO(records);

	return { products: products };
};
