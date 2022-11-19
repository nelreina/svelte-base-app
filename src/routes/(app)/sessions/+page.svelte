<script>
	import SessionTable from './SessionTable.svelte';

	export let data;
	const { sessions, username } = data;
</script>

<h3 class="text-xl mb-3 text-center">Active Sessions</h3>

<SessionTable {sessions} {username} />
