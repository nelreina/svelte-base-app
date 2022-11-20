<script>
	import SessionTable from './SessionTable.svelte';
	import { pbSessions } from './store.js';

	export let data;
	let { username } = data;

	$: sessions = data.sessions;
	$: {
		if ($pbSessions.action === 'delete') {
			sessions = sessions.filter((s) => s.sessionId !== $pbSessions.record.sessionId);
		}
		if ($pbSessions.action === 'create') {
			sessions = [...sessions, $pbSessions.record];
		}
	}
</script>

<h3 class="text-xl mb-3 text-center">Active Sessions</h3>

<SessionTable {sessions} {username} />
