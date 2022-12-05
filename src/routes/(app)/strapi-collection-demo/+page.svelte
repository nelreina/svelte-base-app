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
	<SimpleTable data={data.mappings} {columns} />
</div>
