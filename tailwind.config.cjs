const colors = require('tailwindcss/colors');
module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				win: 'W95FA'
			},
			colors: {
				themebg: '#201F2D',
				heading: '#0A0A0A',
				grey: {
					fg: '#585858',
					bg: '#C6C6C6',
					divider: '#848584'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
