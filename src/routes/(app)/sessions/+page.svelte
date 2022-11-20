<script>
	import SessionTable from './SessionTable.svelte';
	import { getPbRealtimeDataStore } from '$lib/services/stores.js';

	export let data;
	let sessions = getPbRealtimeDataStore(data, 'sessions', 'sessionId');
</script>

<h3 class="text-xl mb-3 text-center">Active Sessions</h3>

<SessionTable sessions={$sessions} />
