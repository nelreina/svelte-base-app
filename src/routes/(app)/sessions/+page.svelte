<script>
	import SessionTable from './SessionTable.svelte';
	// import { pbSessions } from './store.js';

	export let data;
	const { sessions, username } = data;
</script>

<h3 class="text-xl mb-3 text-center">Active Sessions</h3>

<SessionTable {sessions} {username} />

<pre>
<!-- {JSON.stringify($pbSessions, null, 2)} -->
</pre>
