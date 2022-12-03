<script>
	import SessionTable from './SessionTable.svelte';
	import { getPbRealtimeDataStore } from '$lib/services/stores.js';

	export let data;
	const { user } = data;
	const username = user?.username;
	let sessions = getPbRealtimeDataStore(data, 'sessions', 'sessionId');
</script>

<h3 class="text-xl mb-3 text-center">Active Sessions</h3>

<SessionTable sessions={$sessions} {username} />
