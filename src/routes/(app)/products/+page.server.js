import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { serializePOJO } from '$lib/utils/helpers';
import { pbAdmin } from '$server/config/pocketbase';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect('303', base);
	}
	try {
		const records = await pbAdmin.collection('products').getFullList();
		const products = serializePOJO(records);

		return { products: products };
	} catch (error) {
		console.log(error.message);
		return { error: true, products: [] };
	}
};

export const actions = {
	// This function is called at runtime, not build time
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);
		await pbAdmin.collection('products').create(data);
		return {
			success: true
		};
	}
};
