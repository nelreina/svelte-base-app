<script>
	export let data;
	let date = new Date(data?.user?.loggedInAt).toLocaleDateString();
	let time = new Date(data?.user?.loggedInAt).toLocaleTimeString();
</script>

<div class="he ro m in-h-screen">
	<div class="card card-side bg-base-100 shadow-xl">
		<figure><img src="https://placeimg.com/200/280/arch" alt="Movie" /></figure>
		<div class="card-body">
			<h2 class="card-title">Profile</h2>
			<ul class="menu bg-base-100 w-56">
				<li>{data?.user?.username}</li>
				<li>{data?.user?.email}</li>
				<div class="divider" />
				<li class="text-xs">Login At</li>
				<li class="text-xs">{date}: {time}</li>
			</ul>
		</div>
	</div>
</div>
