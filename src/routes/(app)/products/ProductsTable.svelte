<script>
	import SimpleTable from '$lib/components/SimpleTable.svelte';

	export let products = [];
	const columns = [
		{
			title: 'Name',
			field: 'name'
		},
		{
			title: 'Price $',
			field: 'price',
			type: 'number'
		},
		{
			title: 'Stock Status',
			field: 'inStock',
			type: 'number'
		}
	];
	// export let username;
</script>

<SimpleTable data={products} {columns} />
