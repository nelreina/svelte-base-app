import 'dotenv/config';
import RestClient from '@nelreina/rest-client';

const API = process.env['API'];
console.log('LOG:  ~ file: rest-client.js ~ line 5 ~ API', API);

export const restClient = new RestClient(API);
