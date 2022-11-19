const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {}
	},

	plugins: [require('daisyui')]
};

module.exports = config;
