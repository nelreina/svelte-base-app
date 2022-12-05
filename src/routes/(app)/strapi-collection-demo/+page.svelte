<script>
	import SimpleTable from '$lib/components/SimpleTable.svelte';

	export let data;
	const columns = [
		{
			title: 'Mapping',
			field: 'mappingType'
		},
		{
			title: 'Field',
			field: 'field'
		},
		{
			title: 'Type',
			field: 'fieldType',
			md: true
		},
		{
			title: 'Path',
			field: 'declarationPath'
		}
	];
</script>

<div>
	<h3 class="text-xl mb-3 text-center">Strapi Demo Page (fetch Collection)</h3>

	<SimpleTable data={data.mappings} {columns} />
</div>
