<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<div class="hero min-h-screen" style="background-image: url(https://placeimg.com/1000/800/arch);">
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">Welcome to App Name</h1>
			{#if !$page.data.user}
				<p class="mb-5">
					Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
					exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
				</p>
				<a class="btn btn-primary" href="{base}/login">Click to Login</a>
			{:else}
				<p class="mb-5">Welcome back {$page.data.user.username}</p>
				<a class="btn btn-primary" href="{base}/login">Back to Dashboard</a>
			{/if}
		</div>
	</div>
</div>
