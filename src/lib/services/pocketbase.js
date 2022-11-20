const POCKETBASE = import.meta.env['VITE_POCKETBASE'] || 'http://127.0.0.1:8090';

import PocketBase from 'pocketbase';

export const pb = new PocketBase(POCKETBASE);
