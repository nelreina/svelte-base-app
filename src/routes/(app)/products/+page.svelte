<script>
	import ProductsTable from './ProductsTable.svelte';
	import { getPbRealtimeDataStore } from '$lib/services/stores.js';

	export let data;
	let products = getPbRealtimeDataStore(data, 'products');
</script>

<h3 class="text-xl mb-3 text-center">Products (Realtime Collection Demo)</h3>

<ProductsTable products={$products} />
