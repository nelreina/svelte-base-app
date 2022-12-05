<script>
	import { base } from '$app/paths';
	import { getTime } from '$lib/utils/date-utils.js';

	export let data = [];
	export let columns = [];
	// export let username;
</script>

<div class="overflow-x-auto card card-body p-2 shadow-md">
	<table class="table table-compact w-full">
		<thead>
			<tr>
				{#each columns as column}
					<th
						width={column.width}
						class:hidden={column.md}
						class:md:table-cell={column.md}
						class:text-right={column.type === 'number'}
					>
						{column.title}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as row}
				<tr>
					{#each columns as column}
						<td
							class:hidden={column.md}
							class:md:table-cell={column.md}
							class:animate-highlight={row['highlight']}
							class:text-right={column.type === 'number'}
						>
							{row[column.field]}
						</td>
						<!-- content here -->
					{/each}
				</tr>
			{:else}
				<tr>
					<td colspan={columns.length} class="text-center"> No data </td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
