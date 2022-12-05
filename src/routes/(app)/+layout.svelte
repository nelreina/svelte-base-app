<script>
	import Footer from './components/Footer.svelte';
	import Navbar from './components/Navbar.svelte';
	import { base } from '$app/paths';

	export let data;

	const {
		user: { username },
		isAdmin
	} = data;
</script>

<svelte:head>
	<title>Vet Support Portal</title>
</svelte:head>

<Navbar {username} {isAdmin} />
<div class="drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col p-7 ">
		<!-- Page content here -->
		<slot />
	</div>
	<div class="drawer-side border-r-2 border-primary">
		<label for="my-drawer-2" class="drawer-overlay" />
		<ul class="menu p-4 w-48 bg-base-100 text-base-content">
			<!-- Sidebar content here -->
			<li><a href="{base}/dashboard">Dashboard</a></li>
			<li><a href="{base}/products">Products</a></li>
			<li><a href="{base}/strapi-collection-demo">Strapi Demo</a></li>
		</ul>
	</div>
</div>
<Footer />
