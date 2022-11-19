<script>
	import Input from '../../lib/components/Input.svelte';
	export let form;
	import { base } from '$app/paths';
</script>

<div class="hero min-h-screen" style="background-image: url(https://placeimg.com/1000/800/arch);">
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content  text-neutral-content">
		<div class="max-w-md">
			<form class="space-y-3 card card-body" action="?/login" method="post">
				<div class="card-title centered">Please Login</div>
				{#if form?.error}
					<p class="alert alert-error shadow-lg">
						{form.message}
					</p>
				{/if}
				<Input placeholder="Username" name="identifier" value={form?.identifier || ''} />
				<Input placeholder="Password" type="password" name="password" id="password" value="" />
				<button class="btn btn-primary" type="submit">Login</button>
				<a class="btn" href={base}>Cancel</a>
			</form>
		</div>
	</div>
</div>
