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
				{@const isMe = active.username === username}
				<tr>
					<th class="link link-hover link-info">{active.username}</th>
					<td class:text-gray-500={isMe}>{active.email}</td>
					<td class:text-gray-500={isMe}>{active.role}</td>
					<td class:text-gray-500={isMe}>{active.loggedInAt}</td>
					<td>
						{#if !isMe}
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
