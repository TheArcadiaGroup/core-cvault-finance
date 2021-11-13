const colors = require('tailwindcss/colors');
module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			spacing: {
				footer: '3rem'
			},
			fontFamily: {
				win: 'W95FA'
			},
			customGradient: { title: 'linear-gradient(90.32deg, #5557bc 5.48%, #a9697e 94.35%)' },
			colors: {
				border: '#FEFEFE',
				taskbarDark: '#0a0a0a',
				themebg: '#201F2D',
				heading: '#0A0A0A',
				grey: {
					fg: '#585858',
					bg: '#C6C6C6',
					divider: '#848584',
					clicked: '#B2B2B2'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
