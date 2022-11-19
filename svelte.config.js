import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';

const base = '/base-app';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),

		paths: {
			base
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
