import PocketBase from 'pocketbase';
import EventSource from 'eventsource';
import { POCKETBASE } from '$env/static/private';
// const POCKETBASE = process.env['POCKETBASE'] || 'http://127.0.0.1:8090';

global.EventSource = EventSource;
export const pb = new PocketBase(POCKETBASE);
