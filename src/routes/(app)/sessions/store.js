import { readable } from 'svelte/store';
import { pb } from '$lib/services/pocketbase';

export const pbSessions = readable({}, (set) => {
	pb.collection('sessions').subscribe('*', (data) => {
		set(data);
	});
	return () => {
		console.log('unsubscribed from pbSessions');
		pb.collection('sessions').unsubscribe();
	}; // noop
});
