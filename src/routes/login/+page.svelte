<script>
	export let form;
	import { base } from '$app/paths';
</script>

<div class="container">
	<form action="?/login" method="post">
		<div>Please Login</div>
		{#if form?.error}
			<p>
				{form.message}
			</p>
		{/if}
		<input placeholder="Username" name="identifier" value={form?.identifier || ''} />
		<input placeholder="Password" type="password" name="password" id="password" value="" />
		<div class="grid">
			<button type="submit">Login</button>
			<a href={base}>Cancel</a>
		</div>
	</form>
</div>
