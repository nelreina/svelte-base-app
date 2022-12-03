const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		extend: {
			keyframes: {
				highlight: {
					'0%': {
						background: '#8f8'
					},
					'100%': {
						background: 'none'
					}
				}
			},
			animation: {
				highlight: 'highlight 3s'
			}
		}
	},

	plugins: [require('daisyui')]
};

module.exports = config;
