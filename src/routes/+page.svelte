<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<main class="container">
	<h1 class="mb-5 text-5xl font-bold">Welcome to base-app</h1>
	{#if !$page.data.user}
		<p class="mb-5">
			Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
			quasi. In deleniti eaque aut repudiandae et a id nisi.
		</p>
		<a role="button" href="{base}/login">Click to Login</a>
	{:else}
		<p class="mb-5">Welcome back {$page.data.user.username}</p>
		<a role="button" href="{base}/login">Back to Dashboard</a>
	{/if}
</main>
