<script>
	export let sessions;
	export let username;
</script>

<div class="overflow-x-auto card card-body shadow-md">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Role</th>
				<th>Login Time</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each sessions as active}
				<tr>
					<th>{active.username}</th>
					<td>{active.email}</td>
					<td>{active.role}</td>
					<td>{active.loggedInAt}</td>
					<td>
						{#if active.username !== username}
							<form action="?/delete" method="POST">
								<input type="hidden" name="session" value={active.session} />
								<button type="submit" class="btn btn-link">Delete</button>
							</form>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
