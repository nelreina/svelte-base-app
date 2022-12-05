<script>
	import { enhance } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	export let form;
</script>

<div class="card ">
	<form class="lg:flex gap-3  lg:items-center" method="POST" use:enhance>
		<Input placeholder="Name" type="text" name="name" id="name" value={form?.name || ''} />
		<Input placeholder="Price" type="number" name="price" id="price" value={form?.price || ''} />
		<Input placeholder="Stock" name="inStock" id="inStock" value={form?.inStock || ''} />

		<button class="btn btn-primary btn-sm" type="submit">Save</button>
	</form>
</div>
