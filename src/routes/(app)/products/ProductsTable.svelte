<script>
	export let products = [];
	// export let username;
</script>

<div class="overflow-x-auto card card-body shadow-md">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Name</th>
				<th>Price ANG</th>
				<th>In Stock</th>
			</tr>
		</thead>
		<tbody>
			{#each products as prod}
				<tr>
					<td>{prod.name}</td>
					<td>{prod.price}</td>
					<td>{prod.inStock}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
