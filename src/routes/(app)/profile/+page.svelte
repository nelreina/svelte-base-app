<script>
	export let data;
	const { user } = data;
	const POCKETBASE = import.meta.env['VITE_POCKETBASE'] || 'http://127.0.0.1:8090';

	let date = new Date(user?.updated).toLocaleDateString();
	let time = new Date(user?.updated).toLocaleTimeString();
	let avatar = `${POCKETBASE}/api/files/users/${user?.id}/${user?.avatar}?thumb=100x100`;
</script>

<div class="he ro m in-h-screen">
	<div class="card card-side bg-base-100 shadow-xl">
		{#if user?.avatar}
			<figure>
				<img src={avatar} alt="Avatar" />
			</figure>
		{/if}
		<div class="card-body">
			<h2 class="card-title">Profile</h2>
			<ul class="menu bg-base-100 w-56">
				<li>{user?.username}</li>
				<li>{user?.email}</li>
				<div class="divider" />
				<li class="text-xs">Login At</li>
				<li class="text-xs">{date}: {time}</li>
			</ul>
		</div>
	</div>
</div>
