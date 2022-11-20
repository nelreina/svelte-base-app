import PocketBase from 'pocketbase';
import EventSource from 'eventsource';
import { POCKETBASE } from '$env/static/private';

global.EventSource = EventSource;
export const pb = new PocketBase(POCKETBASE);
