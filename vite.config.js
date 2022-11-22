import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$server: '/src/server'
		}
	}
};

export default config;
