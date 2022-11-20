import { readable } from 'svelte/store';
import { pb } from '../../../client/config/pocketbase';

export const pbSessions = readable({}, (set) => {
	pb.collection('sessions').subscribe('*', (data) => {
		set(data);
	});
	return () => {
		pb.collection('sessions').unsubscribe();
	}; // noop
});
