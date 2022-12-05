<script>
	import ProductsTable from './ProductsTable.svelte';
	import { getPbRealtimeDataStore } from '$lib/services/stores.js';
	import ProductForm from './ProductForm.svelte';

	export let data;
	let products = getPbRealtimeDataStore(data, 'products');
</script>

<h3 class="text-xl mb-3 text-center">Products (Realtime Collection Demo)</h3>
<ProductForm />
<ProductsTable products={$products} />
