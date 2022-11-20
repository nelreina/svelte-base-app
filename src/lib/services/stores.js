import { readable } from 'svelte/store';
import { pb } from '$lib/services/pocketbase';

export const getPbRealtimeDataStore = (data, collection, recordId = 'id') =>
	readable(data[collection], (set) => {
		let sessions = data[collection];
		pb.collection(collection).subscribe('*', (coll) => {
			const { action, record } = coll;
			switch (action) {
				case 'create':
					sessions = [record, ...sessions];
					break;

				case 'update':
					console.log('update');
					sessions = sessions.map((session) => {
						if (session[recordId] === record[recordId]) {
							return record;
						}
						return session;
					});
					break;

				case 'delete':
					sessions = sessions.filter((s) => s[recordId] !== record[recordId]);
					break;

				default:
					break;
			}

			set(sessions);
		});
		return () => {
			pb.collection(collection).unsubscribe();
		}; // noop
	});
