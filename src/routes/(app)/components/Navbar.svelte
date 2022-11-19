<script>
	export let username;
	export let isAdmin;
	import { base } from '$app/paths';
</script>

<div class="navbar bg-primary shadow-lg ">
	<div class="flex-1">
		<label for="my-drawer-2" class="btn  drawer-button lg:hidden">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-6 h-6 stroke-current"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/></svg
			>
		</label>

		<a href={base} class="btn btn-ghost normal-case text-white text-xl">App Name</a>
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<label tabindex="0" class="btn  "> {username} </label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li>
					<a href="{base}/profile" class="justify-between">
						Profile
						<span class="badge">New</span>
					</a>
				</li>
				{#if isAdmin}
					<li><a href="{base}/sessions">Sessions</a></li>
				{/if}
				<li>
					<form action="{base}/logout" method="POST">
						<button type="submit">Logout</button>
					</form>
				</li>
			</ul>
		</div>
	</div>
</div>
